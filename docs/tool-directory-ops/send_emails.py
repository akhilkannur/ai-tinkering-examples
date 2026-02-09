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
    "support@pressbeat.io",
    "linkedgrow.ai@gmail.com",
    "prasadaprabhu762@gmail.com",
    "support@podcept.com",
    "roomstageai@gmail.com",
    "murmur.directories@gmail.com",
    "StartupSubmit@trytails.com",
    "info@neonchainx.com",
    "angcarlgrimes@gmail.com",
    "hello@flowly.tools",
    "tryremote87@gmail.com",
    "jeremy@userjam.com",
    "medshots_startupsubmit@hacx.org",
    "gmail@mixels.ai",
    "he@emailverify.ai",
    "contact@stageflow.ai",
    "jason@getoneprofile.com",
    "jaredcoffman54@gmail.com",
    "eleidonapp@gmail.com",
    "champsignalofficial@gmail.com",
    "great@greatcompany.ai"
}

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
    tool_url = f"https://realaiexamples.com/tools/{slug}?utm_source=email&utm_medium=acceptance_notification&utm_campaign=tool_directory_update"
    clean_url = f"realaiexamples.com/tools/{slug}"
    
    text_body = f"""Hey,

I'm reaching out because you submitted {tool_name} to the directory recently.

I've added it to the tool section on Real AI Examples. The site is a curated library of practical AI blueprints, and I've built out this directory to feature handpicked tools that help people get practical work done.

Your tool is live here: {tool_url}

If you want to update any details, just hit reply.

Best,
Akhil"""

    html_body = f"""<div style="font-family: sans-serif; line-height: 1.5; color: #333;">
<p>Hey,</p>
<p>I'm reaching out because you submitted <strong>{tool_name}</strong> to the directory recently.</p>
<p>I've added it to the tool section on <strong>Real AI Examples</strong>. The site is a curated library of practical AI blueprints, and I've built out this directory to feature handpicked tools that help people get practical work done.</p>
<p>Your tool is live here: <a href="{tool_url}" style="color: #007bff; text-decoration: none;">{clean_url}</a></p>
<p>If you want to update any details, just hit reply.</p>
<p>Best,<br>
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

    cutoff_date = datetime.strptime("05/02/2026 06:57:26", "%d/%m/%Y %H:%M:%S")
    tools_to_send = []
    seen_emails = set()

    for row in reader:
        timestamp_str = row.get('Timestamp', '').strip()
        if not timestamp_str:
            continue
        try:
            # Common formats: dd/mm/yyyy HH:MM:SS or m/d/yyyy HH:MM:SS
            try:
                submission_date = datetime.strptime(timestamp_str, "%d/%m/%Y %H:%M:%S")
            except ValueError:
                submission_date = datetime.strptime(timestamp_str, "%m/%d/%Y %H:%M:%S")
        except ValueError:
            continue

        if submission_date <= cutoff_date:
            continue

        email = row.get('Please enter your contact email', '').strip()
        if not email:
            email = row.get('Email address', '').strip()
        email_lower = email.lower()

        tool_name = row.get('What is the name of your tool', '').strip()
        clean_name = tool_name
        # Apply name mappings if needed
        if "shortsai" in tool_name.lower():
            clean_name = "ShortsAi"

        # SAFETY CHECK: Must be in live directory
        if clean_name.lower().strip() not in live_names:
            continue

        # DEDUP & ALREADY SENT CHECK
        if email_lower in seen_emails or email_lower in ALREADY_SENT:
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
    process_and_send(limit=None)