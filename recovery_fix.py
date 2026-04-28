import csv
import json
import re
from datetime import datetime, timedelta
from collections import defaultdict

def recovery_fix():
    # 1. Map URLs to Timestamps from CSV (source of truth for dates)
    url_to_date = {}
    with open('latest_submissions_retry.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row.get('What is the URL where your tool can be accessed?', '').strip().replace('https://', '').replace('http://', '').strip('/')
            if not url or url.lower() == 'test': continue
            ts_str = row.get('Timestamp', '')
            if ts_str:
                try:
                    dt = datetime.strptime(ts_str, '%d/%m/%Y %H:%M:%S')
                    url_to_date[url] = dt
                except: pass

    # 2. Extract tools from the RECOVERED file (source of truth for enrichments)
    with open('lib/ai-tools-data.ts.recovered', 'r', encoding='utf-8') as f:
        content = f.read()

    def extract_blocks(text):
        blocks = []
        start_idx = text.find('export const aiTools: AiTool[] = [')
        if start_idx == -1: return []
        start_idx += len('export const aiTools: AiTool[] = [')
        
        brace_count = 0
        current_block = ""
        in_string = False
        quote_char = ""
        
        for i in range(start_idx, len(text)):
            char = text[i]
            # Simple string tracking (doesn't handle escaped quotes inside strings well, but enough for structure)
            if (char == '"' or char == "'") and (i == 0 or text[i-1] != '\\'):
                if not in_string: in_string = True; quote_char = char
                elif char == quote_char: in_string = False
            
            if not in_string:
                if char == '{': brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        current_block += char; blocks.append(current_block); current_block = ""; continue
            
            if brace_count > 0: current_block += char
            if brace_count == 0 and char == ']': break
        return blocks

    raw_blocks = extract_blocks(content)
    unique_tools = {}
    
    # Heuristics for agencies
    agency_keywords = [' agency', 'studio', 'consulting', 'built for you', 'bespoke services']

    for b in raw_blocks:
        # Clean up corrupted multi-line descriptions
        # Look for description: " ... url:
        desc_match = re.search(r'description:\s*"(.*?)",?\s*url:', b, re.DOTALL)
        if not desc_match:
            # Try to find description even if it's broken
            start_desc = b.find('description: "')
            if start_desc != -1:
                start_desc += len('description: "')
                end_desc = b.find('",', start_desc)
                if end_desc == -1: # Broken/Corrupted case like BlazeHive
                     # Find where url: starts
                     url_start = b.find('url:')
                     desc_text = b[start_desc:url_start].strip().strip(',').strip('"')
                     # Replace description in block with a clean one-liner
                     clean_desc = " ".join(desc_text.split())
                     b = b[:start_desc] + clean_desc + '",' + b[url_start:]
                
        # Re-parse clean block
        name_match = re.search(r'name:\s*"(.*?)"', b) or re.search(r'"name":\s*"(.*?)"', b)
        url_match = re.search(r'url:\s*"(.*?)"', b) or re.search(r'"url":\s*"(.*?)"', b)
        
        if name_match and url_match:
            name = name_match.group(1)
            url = url_match.group(1).replace('https://', '').replace('http://', '').strip('/')
            
            # 1. Agency Filter
            desc_text = b.lower()
            if any(k in desc_text for k in agency_keywords) and "agent" not in name.lower():
                print(f"Skipping Agency: {name}")
                continue
            
            # 2. Deduplicate by URL
            if url in unique_tools: continue
            
            # 3. Features Check (Restore if generic)
            # If features array is ["AI-powered automation", "Streamlined workflow", "Easy integration"], it's generic
            if 'AI-powered automation' in b and 'Streamlined workflow' in b:
                # We'll keep it for now but note it
                pass

            sub_date = url_to_date.get(url, datetime(2000, 1, 1))
            unique_tools[url] = {'date': sub_date, 'block': b.strip().strip(',')}

    # 3. Sort and Redistribute
    sorted_tools = sorted(unique_tools.values(), key=lambda x: x['date'], reverse=True)
    
    base_date = datetime(2026, 4, 26)
    final_output = []
    for i, item in enumerate(sorted_tools):
        week_idx = i // 25
        drop_date = (base_date - timedelta(weeks=week_idx)).strftime('%Y-%m-%d')
        
        b = item['block']
        # Date replacement
        b = re.sub(r'dateAdded:\s*".*?"', f'dateAdded: "{drop_date}"', b)
        b = re.sub(r'"dateAdded":\s*".*?"', f'"dateAdded": "{drop_date}"', b)
        
        # Format block
        lines = [l.strip() for l in b.split('\n') if l.strip()]
        new_b = "  {\n"
        for l in lines:
            if l in ['{', '}']: continue
            # Ensure trailing commas
            line = l.rstrip(',')
            new_b += "    " + line + ",\n"
        new_b = new_b.rstrip(',\n') + "\n  }"
        final_output.append(new_b)

    # 4. Save
    header = '''import { AiTool } from './types';

export interface AiTool {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: {
    price: string;
  };
  image: string;
  screenshot?: string;
  dateAdded: string;
  featured?: boolean;
  maker?: {
    name: string;
    image: string;
    role?: string;
    twitter?: string;
  };
  features?: string[];
  pricingDetails?: string;
  integrations?: string[];
}

export const aiTools: AiTool[] = [
'''
    footer = '\n];\n'
    with open('lib/ai-tools-data.ts', 'w', encoding='utf-8') as f:
        f.write(header + ',\n'.join(final_output) + footer)

    print(f"Recovered {len(final_output)} unique tools. Agencies filtered.")

if __name__ == "__main__":
    recovery_fix()
