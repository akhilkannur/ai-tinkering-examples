import csv
import re
import os
from datetime import datetime

import json

def get_already_sent():
    emails = set()
    try:
        with open('docs/tool-directory-ops/send_emails.py', 'r') as f:
            content = f.read()
            # Extract the set content. It's between ALREADY_SENT = { and }
            match = re.search(r'ALREADY_SENT = \{(.*?)\}', content, re.DOTALL)
            if match:
                raw_emails = match.group(1)
                # Parse emails from the string
                for line in raw_emails.split(','):
                    clean = line.strip().strip('"').strip("'")
                    if clean:
                        emails.add(clean.lower())
    except Exception as e:
        print(f"Error reading ALREADY_SENT: {e}")
    return emails

def get_rejected_emails():
    emails = set()
    try:
        if os.path.exists('docs/tool-directory-ops/rejected_submissions.json'):
            with open('docs/tool-directory-ops/rejected_submissions.json', 'r') as f:
                data = json.load(f)
                for e in data:
                    emails.add(e.lower().strip())
    except Exception as e:
        print(f"Error reading rejected submissions: {e}")
    return emails

def get_live_tools():
    names = set()
    try:
        with open('lib/ai-tools-data.ts', 'r') as f:
            content = f.read()
            matches = re.findall(r'name:\s*"(.*?)"', content)
            for m in matches:
                names.add(m.lower().strip())
    except Exception as e:
        print(f"Error reading live tools: {e}")
    return names

def check_new():
    already_sent = get_already_sent()
    rejected_emails = get_rejected_emails()
    live_tools = get_live_tools()
    
    new_candidates = []
    
    cutoff_date = datetime(2026, 1, 12)

    with open('live_submissions.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Check date
            timestamp_str = row.get('Timestamp', '').strip()
            try:
                submission_date = datetime.strptime(timestamp_str, "%d/%m/%Y %H:%M:%S")
            except ValueError:
                continue
                
            if submission_date < cutoff_date:
                continue
                
            # Check email
            email = row.get('Please enter your contact email', '').strip()
            if not email:
                email = row.get('Email address', '').strip()
            
            email_lower = email.lower()
            
            if email_lower in already_sent:
                continue
            
            if email_lower in rejected_emails:
                continue
                
            # Check tool name
            tool_name = row.get('What is the name of your tool', '').strip()
            if tool_name.lower() in live_tools:
                continue
                
            url = row.get('What is the URL where your tool can be accessed?', '').strip()
            desc = row.get('Provide a brief description of your tool (maximum 280 characters).', '').strip()
            
            new_candidates.append({
                'name': tool_name,
                'url': url,
                'desc': desc,
                'email': email,
                'date': submission_date
            })

    print(f"Found {len(new_candidates)} new candidates:\n")
    for i, tool in enumerate(new_candidates, 1):
        print(f"--- Candidate {i} ---")
        print(f"Name: {tool['name']}")
        print(f"URL:  {tool['url']}")
        print(f"Desc: {tool['desc']}")
        print(f"Email: {tool['email']}")
        print(f"Date: {tool['date']}")
        print("")

if __name__ == "__main__":
    check_new()
