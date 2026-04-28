import re
import os

def main():
    file_path = 'lib/ai-tools-data.ts'
    if not os.path.exists(file_path):
        print("File not found")
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to match each tool object
    pattern = r'\{\s*name:\s*"(.*?)"(.*?)\}  ,'
    # The above might be fragile. Let's use a simpler one and parse results.
    
    # Better: find all occurrences of name: and then find the maker and url in proximity
    names = list(re.finditer(r'name:\s*"(.*?)"', content))
    swaps = []
    
    for i, name_match in enumerate(names):
        name = name_match.group(1).strip()
        start_pos = name_match.start()
        
        # Skip if this is actually a maker name field
        if content[start_pos-10:start_pos].strip().endswith('maker: {'):
            continue
            
        # Find the next '},' to bound the search for url and maker
        end_pos = content.find('},', start_pos)
        if end_pos == -1:
            end_pos = len(content)
            
        block = content[start_pos:end_pos]
        
        url_match = re.search(r'url:\s*"(.*?)"', block)
        url = url_match.group(1).strip() if url_match else "N/A"
        
        maker_match = re.search(r'maker:\s*\{\s*name:\s*"(.*?)"', block)
        maker_name = maker_match.group(1).strip() if maker_match else None
        
        if len(name) > 60:
            swaps.append({'type': 'Long Name', 'name': name, 'url': url})
        elif maker_name and name == maker_name:
            swaps.append({'type': 'Name=Maker', 'name': name, 'url': url})
            
    if swaps:
        print(f"Found {len(swaps)} potential field swaps/errors:")
        for swap in swaps:
            print(f"[{swap['type']}]")
            print(f"  Name: {swap['name']}")
            print(f"  URL: {swap['url']}")
            print("-" * 20)
    else:
        print("No swaps found.")

if __name__ == "__main__":
    main()
