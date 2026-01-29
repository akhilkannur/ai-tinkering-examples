import csv
import json
import subprocess
import time
import re
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
    # Add tracking parameters
    tool_url = f"https://realaiexamples.com/tools/{slug}?utm_source=email&utm_medium=acceptance_notification&utm_campaign=tool_directory_launch"
    
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
        "marcel.mueller@jadenx.com",
        "info@ultimatetools.eu",
        "support@snaptowindow.com",
        "blktwuj@gmail.com",
        "sergey@nicegram.app",
        "team@aye.international",
        "hello@mapyourvoyage.com",
        "hi@beatable.co",
        "admin@sanamujer.com",
        "andreaalexander212@gmail.com",
        "oleg@pentestmate.com",
        "hi@aithumbnail.com",
        "admin@feynn.ai",
        "talk@qeeebo.com",
        "d.pastore@markeplay.com",
        "nicsequenzy@gmail.com",
        "info@suburbstack.com",
        "admin@cryptonewsnavigator.com",
        "hello@3dsynth.app",
        "info@slidescockpit.com",
        "andrew@bookswift.app",
        "info@airankpilot.com",
        "ankushorav@gmail.com",
        "support@stride-fuel.com",
        "michel@19volt.com",
        "contact@kataloop.com",
        "jouni.flemming.macecraft@gmail.com",
        "hypnotype.sparked@gmail.com",
        "support@agentgatepay.com",
        "directory@emailferret.io",
        "admin@imejis.io",
        "support@slidewhisper.com",
        "contact@chatty.fit",
        "info@xn--festklnning-q8a.se",
        "info@xn--gglossning-p5a.se",
        "izoyeqofoyuy56@gmail.com",
        "yttranscripts.org@gmail.com",
        "generatemetadata@gmail.com",
        "contact@makebestmusic.com",
        "wangava498@gmail.com",
        "seo@reasonyx.com",
        "seomode.co@gmail.com",
        "dharmendraramkkumar@gmail.com",
        "actionagentsseo@gmail.com",
        "sales@reachfast.ai",
        "statedaoteam@gmail.com",
        "helpful@thebuildermarket.com",
        "rizwan@websparks.ai",
        "sarma.bkp@acta.ai",
        "steve@bypassgpt.org",
        "mohanishp1@gmail.com",
        "usefulaihub@gmail.com",
        "contact@jobsaicopilot.com",
        "ula@vidnoz.com",
        "lightroompresetgeneratorcom@gmail.com",
        "thatsmyai608@gmail.com",
        "cognexocom@gmail.com",
        "lvloomystery@gmail.com",
        "hello@aichatbot.support",
        "autopilotshortscom@gmail.com",
        "jobbuddytechcom@gmail.com",
        "roastmylandingpageio@gmail.com",
        "tweetfastcom@gmail.com",
        "contact@libretto.fm",
        "submitsaascom@gmail.com",
        "goodaitoolsmkt@gmail.com",
        "mosborn@skail.ai",
        "seoaibotcom@gmail.com",
        "adam.barta404@gmail.com",
        "a.h.s.arbeit@gmail.com",
        "akhilnairmk@gmail.com",
        "ad.tekadio@outlook.com",
        "support@allscreenshots.com",
        "zack@kairaweb.com",
        "julianbornemo1@gmail.com",
        "info@menubartime.com",
        "support@geminiwatermarkremover.net",
        "hello@archrender.ai",
        "y.milyutin@moduledge.com",
        "daniel@indiethinkers.com",
        "support+dirs@bankpdfconverter.com",
        "admin@sqrdaway.com",
        "contact@logostream.dev",
        "getarchivist@gmail.com",
        "support@bitvoiper.com",
        "support@vitelnk.com",
        "info@scenelab.ai",
        "jake@multic.com",
        "hi@thrive.fi",
        "support@pressbeat.io"
    }

    with open('tools_export.csv', 'r', encoding='utf-8') as f:
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