import csv
import json
import subprocess
import time
import re
import requests
from datetime import datetime

import os

# Try to load from .env.local if not in environment
if not os.environ.get("RESEND_API_KEY"):
    try:
        with open('.env.local', 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('RESEND_API_KEY='):
                    os.environ["RESEND_API_KEY"] = line.split('=', 1)[1].strip().strip('"').strip("'")
                    break
    except Exception:
        pass

API_KEY = os.environ.get("RESEND_API_KEY")
if not API_KEY:
    raise ValueError("RESEND_API_KEY environment variable not set. Please set it or add it to .env.local")

# Audience: "Tool submissions"
AUDIENCE_ID = "7d20626b-66a6-4dfc-86db-6231d8a06e2b"

def slugify(text):
    """Mirror of the frontend slugify logic."""
    text = text.lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    text = re.sub(r'\-\-+', '-', text)
    return text

def get_live_tool_names():
    """Reads lib/ai-tools-data.ts and extracts the tool names."""
    with open('lib/ai-tools-data.ts', 'r') as f:
        content = f.read()
    names = re.findall(r'name:\s*"(.*?)"', content)
    return {n.lower().strip() for n in names}

def add_contact_to_audience(email):
    """Adds the contact to the Resend Audience."""
    url = f"https://api.resend.com/audiences/{AUDIENCE_ID}/contacts"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "email": email,
        "unsubscribed": False
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code in [200, 201]:
            print(f"   [Audience] Added: {email}")
            return True
        else:
            print(f"   [Audience] Failed to add {email}: {response.text}")
            return False
    except Exception as e:
        print(f"   [Audience] Error adding {email}: {str(e)}")
        return False

def send_email(recipient, tool_name):
    subject = f"{tool_name} is live on Real AI Examples"
    slug = slugify(tool_name)
    # Add tracking parameters
    tool_url = f"https://realaiexamples.com/tools/{slug}?utm_source=email&utm_medium=acceptance_notification&utm_campaign=tool_directory_launch"
    clean_url = f"realaiexamples.com/tools/{slug}"
    
    text_body = f"""Hey there!

I wanted to reach out because you submitted {tool_name} to the Tooling Around directory recently.

Since Tooling Around is no longer being maintained, I have created a directory section in my new project, Real AI Examples, this week, which focuses on practical AI use cases. I hand-picked a few submissions that stood out, and yours made the cut.

Your tool is now live at: {tool_url}

You don't need to do anything, but if you want to update any details or have questions, just reply to this email.

Thanks,
Akhil"""

    html_body = f"""<div style="font-family: sans-serif; line-height: 1.5; color: #333;">
<p>Hey there!</p>
<p>I wanted to reach out because you submitted <strong>{tool_name}</strong> to the Tooling Around directory recently.</p>
<p>Since Tooling Around is no longer being maintained, I have created a directory section in my new project, <strong>Real AI Examples</strong>, this week, which focuses on practical AI use cases. I hand-picked a few submissions that stood out, and yours made the cut.</p>
<p>Your tool is now live at: <a href="{tool_url}" style="color: #007bff; text-decoration: none;">{clean_url}</a></p>
<p>You don't need to do anything, but if you want to update any details or have questions, just reply to this email.</p>
<p>Thanks,<br>
<strong>Akhil</strong></p>
</div>"""

    payload = {
        "from": "akhil@mail.realaiexamples.com",
        "to": [recipient],
        "reply_to": "akhil@realaiexamples.com",
        "subject": subject,
        "text": text_body,
        "html": html_body
    }
    
    json_payload = json.dumps(payload)
    cmd = [
        "curl", "-X", "POST", "https://api.resend.com/emails",
        "-H", f"Authorization: Bearer {API_KEY}",
        "-H", "Content-Type: application/json",
        "-d", "@-"
    ]
    
    print(f"Sending to {recipient} ({tool_name})...")
    result = subprocess.run(cmd, input=json_payload, capture_output=True, text=True)
    return result.returncode == 0

def process_and_send(limit=None):
    live_names = get_live_tool_names()
    print(f"Verified {len(live_names)} tools live on the site.")
    
    # Fetch live data from Google Sheets
    print("Fetching live submissions from Google Sheets...")
    sheet_url = "https://docs.google.com/spreadsheets/d/1VL4dAgyQK8EZLo6WqZeQ0zOmsCQcxQLhixmFtsJWC3A/export?format=csv"
    try:
        response = requests.get(sheet_url)
        response.raise_for_status()
        csv_content = response.text.splitlines()
        reader = csv.DictReader(csv_content)
    except Exception as e:
        print(f"Error fetching Google Sheet: {e}")
        return

    tools_to_send = []

        for row in reader:
            timestamp_str = row.get('Timestamp', '').strip()
            try:
                submission_date = datetime.strptime(timestamp_str, "%d/%m/%Y %H:%M:%S")
            except ValueError:
                continue
            if submission_date < cutoff_date:
                continue

            email = row.get('Please enter your contact email', '').strip()
            if not email:
                email = row.get('Email address', '').strip()
            email_lower = email.lower()

            tool_name = row.get('What is the name of your tool', '').strip()
            clean_name = tool_name
            if "vidmix.ai" in tool_name.lower():
                clean_name = "Vidmix.ai"
            if "cursor for marketing emails" in tool_name.lower():
                clean_name = "Sequenzy"

            # SAFETY CHECK: Must be in live directory
            if clean_name.lower().strip() not in live_names:
                # print(f"Skipping {clean_name} - not in live directory")
                continue

            # DEDUP & ALREADY SENT CHECK
            if email_lower in seen_emails or email_lower in ALREADY_SENT:
                # print(f"Skipping {clean_name} - already sent to {email_lower}")
                continue
            
            seen_emails.add(email_lower)
            tools_to_send.append({'email': email, 'tool_name': clean_name})

    print(f"Found {len(tools_to_send)} tools to email.")
    
    count = 0
    for tool in tools_to_send:
        if limit and count >= limit:
            break
        if send_email(tool['email'], tool['tool_name']):
            add_contact_to_audience(tool['email'])
            count += 1
            time.sleep(2)

if __name__ == "__main__":
    # Set limit=None to process all new tools found
    process_and_send(limit=None)
