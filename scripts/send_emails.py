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
        with open('.env', 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('RESEND_API_KEY='):
                    os.environ["RESEND_API_KEY"] = line.split('=', 1)[1].strip().strip('"').strip("'")
                    break
    except Exception:
        pass

API_KEY = os.environ.get("RESEND_API_KEY")
if not API_KEY:
    raise ValueError("RESEND_API_KEY environment variable not set. Please set it in .env")

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
    "great@greatcompany.ai",
    "ReplyChampion@gmail.com",
    "mihaiencamera@gmail.com",
    "jeffreybatista867@gmail.com",
    "jerryopande27@gmail.com",
    "contact@uselino.com",
    "nikhil.highreach@gmail.com",
    "shashwat@ayudo.ai",
    "linkpilot30@gmail.com",
    "stickaudiovideo@gmail.com",
    "launch@densops.com",
    "daniel1398.santos@gmail.com",
    "ReplyChampion@gmail.com",
    "hello@octopost.ai",
    "support@bridgecall.app",
    "williamawake43@gmail.com",
    "mail@greenpt.ai",
    "adityaravindra848@gmail.com",
    "marketingcomparis@gmail.com",
    "pathwiseai9@gmail.com",
    "rakeshvarma209080@gmail.com",
    "marketing@technologycircle.io",
    'aiartiststartup@gmail.com',
    'info@ticketsdata.com',
    'ilyadavodoich@gmail.com',
    'privatclaw@gmail.com',
    'support@korops.com',
    'hi@christianek.io',
    'korlalaim@gmail.com',
    'miromiro.app@gmail.com',
    'contact@traidies.com',
    'ameliawright7562@gmail.com',
    'jamesandre9393@gmail.com',
    'info@matrics.io',
    'pruntykelsie@gmail.com',
    'mudit@xmit.sh',
    'alialsayond@gmail.com',
    'signup@getalignmint.org',
}

def slugify(text):
    """Mirror of the frontend slugify logic."""
    text = text.lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'\.', '-', text)
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

def send_email(recipient, tool_name, category="Productivity"):
    subject = f"{tool_name} is live + an honest favor"
    slug = slugify(tool_name)
    # Add tracking parameters
    tool_url = f"https://realaiexamples.com/tools/{slug}?utm_source=email&utm_medium=acceptance_notification&utm_campaign=badge_requirement"
    badge_url = "https://realaiexamples.com/tools/badge"
    clean_url = f"realaiexamples.com/tools/{slug}"

    text_body = f"""Hey,

Just letting you know I’ve added {tool_name} to the directory on Real AI Examples. You can see your listing here: {tool_url}

When I started this site, I just added tools for free so makers could "submit and forget" while I did the rest. But I've realized that for this to actually be useful to everyone, we need to trade some authority.

I’m moving to a "Verified" model where free listings include a "Featured" badge (or a simple backlink) in exchange for the listing. A few new makers have already done this, and I’m expecting a significant DR boost for the whole directory in the coming weeks as a result.

To keep your backlink active and stay in the main directory, please add the badge or a link by May 20th. 

Grab your embed code here: {badge_url}

If you don't want to use the badge, a simple text link anywhere on your site works too. It only takes a minute but ensures we all get the SEO benefit from each other's efforts.

Best,
Akhil

P.S. If you have any suggestions or edits for your listing, just reply to this email and I’ll get it updated for you."""

    html_body = f"""<div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px;">
<p>Hey,</p>
<p>Just letting you know I’ve added <strong>{tool_name}</strong> to the directory on Real AI Examples. You can see your listing here: <a href="{tool_url}" style="color: #007bff; text-decoration: none;">{clean_url}</a></p>

<p>When I started this site, I just added tools for free so makers could "submit and forget" while I did the rest. But I've realized that for this to actually be useful to everyone, we need to trade some authority.</p>

<p>I’m moving to a "Verified" model where free listings include a "Featured" badge (or a simple backlink) in exchange for the listing. A few new makers have already done this, and I’m expecting a significant DR boost for the whole directory in the coming weeks as a result.</p>

<div style="margin: 20px 0; padding: 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px;">
<p style="margin-top: 0; font-weight: bold; color: #166534;">⚠️ Action: Add Badge or Link by May 20th</p>
<p style="font-size: 14px; margin-bottom: 15px;">To keep your backlink active and stay in the main directory, please embed the badge or a simple text link.</p>
<p style="margin-bottom: 0;"><a href="{badge_url}" style="display: inline-block; background-color: #166534; color: white; padding: 10px 18px; text-decoration: none; font-weight: bold; font-size: 13px; border-radius: 4px;">Get Your Embed Code →</a></p>
</div>

<p style="font-size: 14px;">If you don't want to use the badge, a simple text link anywhere on your site works too. It only takes a minute but ensures we all get the SEO benefit from each other's efforts.</p>

<p>Best,<br>
<strong>Akhil</strong></p>

<p style="font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 15px; margin-top: 25px;">
<strong>P.S.</strong> If you have any suggestions or edits for your listing, just reply to this email and I’ll get it updated for you.
</p>
</div>"""
    # Schedule for today at 10:00 AM UTC (or now if after 10:00)
    now = datetime.utcnow()
    # If today's 10:00 UTC has passed, schedule for tomorrow 10:00 UTC
    if now.hour >= 10:
        scheduled_at = now.replace(day=now.day+1, hour=10, minute=0, second=0, microsecond=0).strftime("%Y-%m-%dT%H:%M:%SZ")
    else:
        scheduled_at = now.replace(hour=10, minute=0, second=0, microsecond=0).strftime("%Y-%m-%dT%H:%M:%SZ")

    payload = {
        "from": "akhil@mail.realaiexamples.com",
        "to": [recipient],
        "reply_to": "akhil@realaiexamples.com",
        "subject": subject,
        "text": text_body,
        "html": html_body,
        "scheduled_at": scheduled_at
    }

    json_payload = json.dumps(payload)
    cmd = [
        "curl", "-s", "-X", "POST", "https://api.resend.com/emails",
        "-H", f"Authorization: Bearer {API_KEY}",
        "-H", "Content-Type: application/json",
        "-d", "@-"
    ]

    print(f"Sending to {recipient} ({tool_name})...")
    result = subprocess.run(cmd, input=json_payload, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
    return result.returncode == 0

def process_and_send(limit=None):
    live_names = get_live_tool_names()
    print(f"Verified {len(live_names)} tools live on the site.")

    # Read local CSV file
    print("Reading local submissions CSV...")
    try:
        with open('latest_submissions.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    tools_to_send = []
    seen_emails = set()

    # Map name to newest entry
    submission_map = {}
    for row in rows:
        name = row.get('What is the name of your tool', '').strip()
        if name:
            submission_map[name.lower()] = row

    for name_lower, row in submission_map.items():
        if name_lower not in live_names:
            continue

        email = row.get('Please enter your contact email', '').strip()
        if not email:
            email = row.get('Email address', '').strip()

        if not email:
            continue

        email_lower = email.lower()

        # DEDUP & ALREADY SENT CHECK
        if email_lower in seen_emails or email_lower in ALREADY_SENT:
            continue

        seen_emails.add(email_lower)
        tools_to_send.append({'email': email, 'tool_name': row.get('What is the name of your tool', '').strip()})

    print(f"Found {len(tools_to_send)} tools to email.")

    # Display preview
    for i, tool in enumerate(tools_to_send[:10]):
        print(f"{i+1}. {tool['tool_name']} ({tool['email']})")
    if len(tools_to_send) > 10:
        print(f"... and {len(tools_to_send) - 10} more.")

    confirm = input("\nProceed with sending? (y/n): ")
    if confirm.lower() != 'y':
        print("Cancelled.")
        return

    count = 0
    for tool in tools_to_send:
        if limit and count >= limit:
            break

        # Try to find actual category from data
        actual_category = "Productivity"
        with open('lib/ai-tools-data.ts', 'r') as f:
            content = f.read()
            # Find the entry for this tool and extract category
            tool_block = re.search(f'name:\\s*"{re.escape(tool["tool_name"])}".*?category:\\s*"(.*?)"', content, re.DOTALL | re.IGNORECASE)
            if tool_block:
                actual_category = tool_block.group(1)

        if send_email(tool['email'], tool['tool_name'], actual_category):
            add_contact_to_audience(tool['email'])
            count += 1
            time.sleep(1) # Slow down slightly

if __name__ == "__main__":
    process_and_send(limit=None)