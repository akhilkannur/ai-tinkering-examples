import csv
import re
import os

def load_csv(file_path):
    tools = []
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            tools.append(row)
    return tools

def load_ts(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Very basic regex to extract tool names and URLs
    # This is not perfect but should give us a good idea
    names = re.findall(r'name: "(.*?)",', content)
    urls = re.findall(r'url: "(.*?)",', content)
    return list(zip(names, urls))

csv_tools = load_csv('/home/akhilnairmk/ai-tinkering-examples/latest_submissions_retry.csv')
ts_tools = load_ts('/home/akhilnairmk/ai-tinkering-examples/lib/ai-tools-data.ts')

print(f"Total CSV tools: {len(csv_tools)}")
print(f"Total TS tools: {len(ts_tools)}")

matches = 0
for csv_tool in csv_tools:
    csv_name = csv_tool.get('What is the name of your tool', '').strip().lower()
    csv_url = csv_tool.get('What is the URL where your tool can be accessed?', '').strip().lower()
    
    found = False
    for ts_name, ts_url in ts_tools:
        if csv_name == ts_name.lower() or (csv_url and csv_url in ts_url.lower()) or (ts_url and ts_url.lower() in csv_url):
            found = True
            break
    if found:
        matches += 1

print(f"Matches found: {matches}")
