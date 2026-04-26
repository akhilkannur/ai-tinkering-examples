import csv
import re
import json
import os

def load_csv(file_path):
    tools = []
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            tools.append(row)
    return tools

def parse_ts_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to keep track of the start and end of each block to replace it later
    tools = []
    # Match the whole object block
    pattern = re.compile(r'\{\s+name: "(.*?)",.*?url: "(.*?)",.*?\},', re.DOTALL)
    for match in pattern.finditer(content):
        full_block = match.group(0)
        name = match.group(1)
        url = match.group(2)
        tools.append({
            'name': name,
            'url': url,
            'full_block': full_block
        })
    return tools, content

csv_tools = load_csv('/home/akhilnairmk/ai-tinkering-examples/latest_submissions_retry.csv')
ts_tools, ts_content = parse_ts_file('/home/akhilnairmk/ai-tinkering-examples/lib/ai-tools-data.ts')

common_integrations = [
    "Slack", "Shopify", "HubSpot", "Zapier", "WordPress", "Salesforce", "WhatsApp", 
    "Gmail", "Outlook", "Stripe", "Discord", "Telegram", "Instagram", "Facebook", 
    "TikTok", "YouTube", "LinkedIn", "Zendesk", "Intercom", "Notion", "Airtable", 
    "QuickBooks", "Xero", "Webhooks", "REST API", "Chrome Extension", "iOS", "Android",
    "macOS", "Windows", "Linux", "Microsoft Word", "Zoom", "Next.js", "GitHub", "Claude Code", "Zsh"
]

compliance_keywords = ["SOC 2", "GDPR", "HIPAA", "ISO", "BIP-39", "PCI DSS"]

enrichments = {}

for csv_tool in csv_tools:
    csv_name = csv_tool.get('What is the name of your tool', '').strip()
    csv_url = csv_tool.get('What is the URL where your tool can be accessed?', '').strip()
    brief_desc = csv_tool.get('Provide a brief description of your tool (maximum 500 characters).', '')
    detailed_desc = csv_tool.get('Provide a detailed description of your tool, highlighting its key features and benefits (maximum 2000 characters).', '')
    
    full_text_orig = (brief_desc + "\n" + (detailed_desc or ""))
    full_text = full_text_orig.lower()
    
    # Find match in TS
    matched_ts = None
    for ts_tool in ts_tools:
        # Match by name or URL
        if csv_name.lower() == ts_tool['name'].lower() or \
           (csv_url and csv_url.rstrip('/') in ts_tool['url'].rstrip('/')) or \
           (ts_tool['url'] and ts_tool['url'].rstrip('/') in csv_url.rstrip('/')):
            matched_ts = ts_tool
            break
    
    if matched_ts:
        # Extract Integrations
        found_integrations = []
        for integration in common_integrations:
            if re.search(r'\b' + re.escape(integration.lower()) + r'\b', full_text):
                found_integrations.append(integration)
        
        # Extract Compliance
        found_compliance = []
        for comp in compliance_keywords:
            if comp.lower() in full_text:
                found_compliance.append(comp)
        
        # Extract Niche
        niche = None
        niche_match = re.search(r'(?:built for|designed for|specifically for|ideal for|perfect for|for) (.*?)(?:\.|\,)', full_text)
        if niche_match:
            niche = niche_match.group(1).strip()
            if len(niche) > 60: # too long
                niche = None

        # Extract Features (look for bullet points or lists in ORIGINAL text to preserve case)
        features = []
        # Match lines starting with - or * or •
        feature_matches = re.findall(r'(?:^|[\n\r])\s*[*-•]\s*(.*?)(?=[\n\r]|$)', full_text_orig)
        if feature_matches:
            for f in feature_matches:
                f = f.strip()
                if 20 < len(f) < 150:
                    features.append(f)
        
        # If no bullet points, look for sentences with keywords
        if len(features) < 2:
            sentences = re.split(r'\. |\n', full_text_orig)
            for s in sentences:
                s = s.strip()
                if any(k in s.lower() for k in ["features", "includes", "supports", "allows", "enables", "provides"]):
                    if 30 < len(s) < 150:
                        features.append(s)
        
        # Special check for "Nlimited" bug - actually let's just make sure we don't include the marker if it's not there
        # The previous regex might have been too broad if I didn't use full_text_orig.
        
        best_desc = brief_desc.strip()
        if len(best_desc) < 50 and detailed_desc:
            best_desc = detailed_desc.strip()
        
        enrichments[matched_ts['name']] = {
            'integrations': list(set(found_integrations)),
            'compliance': list(set(found_compliance)),
            'niche': niche,
            'features': features[:6],
            'description_csv': best_desc
        }

with open('/home/akhilnairmk/ai-tinkering-examples/enrichments.json', 'w') as f:
    json.dump(enrichments, f, indent=2)

print(f"Enrichments generated for {len(enrichments)} tools.")
