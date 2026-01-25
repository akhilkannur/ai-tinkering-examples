import csv
import json
import subprocess
import time
import re
from datetime import datetime

import os

API_KEY = os.environ.get("RESEND_API_KEY")
if not API_KEY:
    raise ValueError("RESEND_API_KEY environment variable not set")

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

def send_email(recipient, tool_name):
    subject = f"{tool_name} is live on Real AI Examples"
    slug = slugify(tool_name)
    tool_url = f"https://realaiexamples.com/tools/{slug}"
    
    text_body = f"""Hey there!

I wanted to reach out because you submitted {tool_name} to the Tooling Around directory recently.

Since Tooling Around is no longer being maintained, I have created a directory section in my new project, Real AI Examples, this week, which focuses on practical AI use cases. I hand-picked a few submissions that stood out, and yours made the cut.

Your tool is now live at: {tool_url}

You don't need to do anything, but if you want to update any details or have questions, just reply to this email.

Thanks,
Akhil"""

    payload = {
        "from": "akhil@mail.realaiexamples.com",
        "to": [recipient],
        "reply_to": "akhil@realaiexamples.com",
        "subject": subject,
        "text": text_body
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
    
    tools_to_send = []
    seen_emails = set()
    cutoff_date = datetime(2026, 1, 12)
    
    # Update this set before running to avoid re-sending to old batches
    ALREADY_SENT = {
        "silverioguate581@gmail.com", 
        "rokas@overvisual.com",
        "info@popjam.io",
        "support@localbiz.ai",
        "robert@getargus.ai",
        # ... add others from previous runs here
    }

    with open('tools_submissions.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
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
                print(f"Skipping {clean_name} - already sent to {email_lower}")
                continue
            
            seen_emails.add(email_lower)
            tools_to_send.append({'email': email, 'tool_name': clean_name})

    print(f"Found {len(tools_to_send)} tools to email.")
    
    count = 0
    for tool in tools_to_send:
        if limit and count >= limit:
            break
        if send_email(tool['email'], tool['tool_name']):
            count += 1
            time.sleep(2)

if __name__ == "__main__":
    # Set limit=None to process all new tools found
    process_and_send(limit=None)