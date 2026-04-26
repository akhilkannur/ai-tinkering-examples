import csv
import re
import json

def find_missing_tools():
    # 1. Get existing tool data
    with open('lib/ai-tools-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    existing_names = set(re.findall(r'name:\s*"(.*?)"', content))
    existing_urls = set(re.findall(r'url:\s*"(.*?)"', content))
    
    print(f"Loaded {len(existing_names)} names and {len(existing_urls)} URLs from site.")

    # 2. Explicit SKIP list
    skip_url_patterns = [
        'aigirlfriend.wtf', 'aigirlfriend.chat', 
        'alaskasupremepainting.com', 'xn--festklnning', 'xn--gglossning',
        'test', 'sadasdsad', 'linkedin.com/company'
    ]

    missing_tools = []
    with open('latest_submissions_retry.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get('What is the name of your tool', '').strip()
            url = row.get('What is the URL where your tool can be accessed?', '').strip()
            
            if not name or not url or url.lower() == 'test':
                continue
            
            # Standardize URL for comparison
            clean_url = url.replace('https://', '').replace('http://', '').strip('/')
            
            # Check if URL or Name already exists (loose check)
            exists = False
            for ex_url in existing_urls:
                if clean_url in ex_url or ex_url.replace('https://', '').replace('http://', '').strip('/') in clean_url:
                    exists = True
                    break
            
            if not exists:
                for ex_name in existing_names:
                    if name.lower() == ex_name.lower() or name.lower() in ex_name.lower() or ex_name.lower() in name.lower():
                        exists = True
                        break
            
            if exists:
                continue
                
            # Check explicit skips
            if any(pat in url.lower() for pat in skip_url_patterns):
                continue

            # Standardize URL for processing
            if not url.startswith('http') and '.' in url:
                url = 'https://' + url

            desc = row.get('Provide a brief description of your tool (maximum 500 characters).', '').strip()
            if not desc:
                desc = row.get('Provide a brief description of your tool (maximum 280 characters).', '').strip()
            
            if any(t['url'] == url for t in missing_tools):
                continue

            missing_tools.append({
                'name': name,
                'url': url,
                'description': desc
            })

    print(f"Truly missing/failed tools: {len(missing_tools)}")
    for i, tool in enumerate(missing_tools):
        print(f"{i+1}. {tool['name']} ({tool['url']})")

    with open('missing_tools.json', 'w') as f:
        json.dump(missing_tools, f, indent=2)

if __name__ == "__main__":
    find_missing_tools()
