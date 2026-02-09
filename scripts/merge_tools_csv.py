import csv
import re
import json
import os
from datetime import datetime

# Define the cutoff timestamp (MedShotsAI's submission time)
CUTOFF_TIMESTAMP_STR = "05/02/2026 06:57:26"
CUTOFF_TIMESTAMP = datetime.strptime(CUTOFF_TIMESTAMP_STR, "%d/%m/%Y %H:%M:%S")

# BLACKLIST: Tools to explicitly exclude
BLACKLIST = [
    "Ai Angels", 
    "Binarium", 
    "Bitsafve",
    "The Gold Calculator"
]

# Define the category mapping based on keywords
def infer_category(description, name):
    desc_lower = description.lower()
    name_lower = name.lower()
    
    if "video" in desc_lower or "audio" in desc_lower or "podcast" in desc_lower or "voice" in desc_lower:
        return "Video & Audio"
    elif "image" in desc_lower or "photo" in desc_lower or "design" in desc_lower or "art" in desc_lower:
        return "Image Generation"
    elif "write" in desc_lower or "copy" in desc_lower or "blog" in desc_lower or "text" in desc_lower or "email" in desc_lower:
        return "Copywriting"
    elif "code" in desc_lower or "develop" in desc_lower or "app" in desc_lower or "website" in desc_lower:
        return "Code Assistance"
    elif "marketing" in desc_lower or "seo" in desc_lower or "social media" in desc_lower:
        return "Marketing"
    else:
        return "Productivity"

def get_domain(url):
    try:
        if not url: return ""
        if not url.startswith('http'):
            url = 'https://' + url
        return url.split('//')[-1].split('/')[0]
    except:
        return ""

def clean_text(text):
    if not text: return ""
    return text.replace('"', '\\"').replace('\n', ' ').strip()

# Read existing TS file to get current URLs (double check to avoid duplicates)
existing_urls = set()
ts_file_path = 'lib/ai-tools-data.ts'

with open(ts_file_path, 'r') as f:
    content = f.read()
    # Simple regex to extract URLs from the TS file
    matches = re.findall(r'url:\s*"(.*?)"', content)
    for url in matches:
        existing_urls.add(url.strip().lower().rstrip('/'))

new_tools = []

print(f"Filtering for tools submitted AFTER {CUTOFF_TIMESTAMP_STR}...")

# Read the CSV
with open('latest_submissions.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        timestamp_str = row.get('Timestamp', '').strip()
        if not timestamp_str:
            continue
            
        try:
            timestamp = datetime.strptime(timestamp_str, "%d/%m/%Y %H:%M:%S")
        except ValueError:
            try:
                timestamp = datetime.strptime(timestamp_str, "%m/%d/%Y %H:%M:%S")
            except:
                print(f"Skipping invalid date: {timestamp_str}")
                continue

        # Filter by timestamp
        if timestamp <= CUTOFF_TIMESTAMP:
            continue

        name = row.get('What is the name of your tool', '').strip()
        
        # BLACKLIST CHECK
        if name in BLACKLIST:
            print(f"Skipping blacklisted tool: {name}")
            continue

        url = row.get('What is the URL where your tool can be accessed?', '').strip()
        if not url:
            continue
            
        clean_url = url.lower().rstrip('/')
        
        # Check if already exists
        if clean_url in existing_urls:
            print(f"Skipping duplicate URL: {url}")
            continue
            
        description = row.get('Provide a brief description of your tool (maximum 280 characters).', '').strip()
        if not description:
            description = row.get('Provide a detailed description of your tool, highlighting its key features and benefits (maximum 2000 characters).', '').strip()
            description = description[:280] + "..." if len(description) > 280 else description

        if not name or not description:
            continue

        submission_type = row.get('How would you like your submission to be processed?', '').lower()
        price = "Freemium" # Default
        if "free" in submission_type:
            price = "Free"
        elif "express" in submission_type or "$" in submission_type:
            price = "Paid"

        category = infer_category(description, name)
        domain = get_domain(url)
        image = f"https://www.google.com/s2/favicons?domain={domain}&sz=128"

        tool = {
            "name": clean_text(name),
            "description": clean_text(description),
            "url": url,
            "category": category,
            "tags": {
                "useCase": ["Business"],
                "price": price,
                "skill": "Beginner"
            },
            "image": image
        }
        new_tools.append(tool)
        existing_urls.add(clean_url) # Prevent duplicates within the CSV itself

# Generate TS code
if not new_tools:
    print("No new tools found after cutoff date.")
    exit(0)

print(f"Found {len(new_tools)} new tools.")

ts_entries = []
for tool in new_tools:
    entry = f"""  {{
    name: "{tool['name']}",
    description: "{tool['description']}",
    url: "{tool['url']}",
    category: "{tool['category']}",
    tags: {{
        useCase: {json.dumps(tool['tags']['useCase'])},
        price: "{tool['tags']['price']}",
        skill: "{tool['tags']['skill']}"
    }},
    image: "{tool['image']}"
}}"""
    ts_entries.append(entry)

# Read the file again
with open(ts_file_path, 'r') as f:
    content = f.read()

# Find the end of the array
last_bracket = content.rfind('];')
if last_bracket == -1:
    print("Error: Could not find end of array in lib/ai-tools-data.ts")
    exit(1)

# Prepare the new content
new_content = content[:last_bracket].strip()
if new_content[-1] != ',':
    new_content += ","

new_content += "\n" + ",\n".join(ts_entries) + "\n];"

# Write back
with open(ts_file_path, 'w') as f:
    f.write(new_content)

print("Successfully merged new tools into lib/ai-tools-data.ts")