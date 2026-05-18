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
    'timothy@northmarkfinance.com.au', 'posusapossystem@gmail.com', 'noamhiva@gmail.com', 'larrycottrell1973@gmail.com', 
    'riskofficer7@gmail.com', 'hello@taunusstar.com', 'josephburns986@gmail.com', 'williamrichard1093@gmail.com', 
    'StartupSubmit@trytails.com', 'hello@shortsai.com', 'tsvetkovn2@gmail.com', 'testlab.ai03@gmail.com', 
    'support@diffscout.com', 'info@simplyhabits.io', 'vienstodd@gmail.com', 'christian@simpleseverance.co', 
    'kyle@binarium.supply', 'info@aiangels.io', 'johnleech921@gmail.com', 'coldemailkit1@gmail.com', 
    'nowandherereg@gmail.com', 'weshopstartups@gmail.com', 'luxoretai@gmail.com', 'julieaviles277@gmail.com', 
    'julienzanet81@gmail.com', 'mayhembryan3@gmail.com', 'hello@pitchtank.io', 'utku@nextdio.com', 
    'thevelop@gmail.com', 'dir@vun.one', 'aime@coticsy.com', 'marketing@dashtera.com', 
    'marketing@claritysearch.ai', 'donnadknaus@gmail.com', 'hello@lunary.app', 'yixiaow98@gmail.com', 
    'david@foundra.de', 'alaska@texastf.com', 'Sunnyrochiramani476@gmail.com', 'help@vuln0x.com', 
    'ev24directories@gmail.com', 'ukmiapi@gmail.com', 'jaredgifford501@gmail.com', 'lxtailor97@gmail.com', 
    'elimu.developer.ss@gmail.com', 'henriklippke653@gmail.com', 'contact@privateclawd.com', 
    'jenniferoverstreet75@gmail.com', 'hello@rankdraft.io', 'supapin.com@gmail.com', 
    'startup@clearmargin.app', 'angolaterra05@gmail.com', 'submissionuser@tanga.app', 
    'temporarymokaru@gmail.com', 'yannick@applaunchflow.com', 'zane@flarewarden.com', 
    'henrikhimmat@gmail.com', 'hello@upagents.app', 'support@flaex.ai', 'jobjourneypro@gmail.com', 
    'hello@preuve.ai', 'hello@careerdnalabs.com', 'callcowhan@gmail.com', 'contact@aigirlfriend.wtf', 
    'hello.yibby@gmail.com', 'joseinnorte@gmail.com', 'support@productmetrics.io', 'support@gmail.com', 
    'masterberrys26@gmail.com', 'hey@selected.site', 'shirrelfziv@gmail.com', 'albertorohr58@gmail.com', 
    'support@jsonyaml.com', 'contact@reppit.ai', 'validatefast@gmail.com', 'hello@availsim.com', 
    'mgstdy@alcazarsec.com', 'app.cowork.ink@gmail.com', 'hello@blinknote.me', 'info@1app.energy', 
    'andrewjamesy45@gmail.com', 'marketontology@gmail.com', 'dylan@joinpond.ai', 'randyalfred81@gmail.com', 
    'alexandre@velys.software', 'support@furnea.ai', 'jadenkiqo@gmail.com', 'hello@polytest.io', 
    'submitdirectory249@gmail.com', 'info@tradetab.co', 'extralt23@gmail.com', 'anzumfaria922@gmail.com', 
    'support@mentalnote.ai', 'eliz@athletedata.health', 'phillip@stride.agency', 'contact@toolab.dev', 
    'support@signalboss.io', 'seospeakpro@gmail.com', 'at@autopilotapp.io', 'socialfinderai@gmail.com',
    'neevaiesinli@gmail.com', 'outreach@rpcfast.com', 'isabell.weber@admark.ai', 'contact@portraitgift.com', 'whitecloverdevs@gmail.com', 
    'glafira@revenew.co', 'info@primefirms.co', 'tson78190@gmail.com', 'hello@pause.do', 'erik@peopledb.co', 
    'faknamec@gmail.com', 'workers2215s@gmail.com', 'support@emailfinder.dev', 'team@archgee.com', 'profiles@acira.ai', 
    'gabi@idlepilot.com', 'edeten.hauckyni@gmail.com', 'hello@shepi.ai', 'expressifyseo@gmail.com', 'ceo@flameproxies.com', 
    'devshipau@gmail.com', 'toddmeshes@gmail.com', 'contact@hi-ai.live', 'mfax.app@gmail.com', 'nokesamoyliv@gmail.com', 
    'rob@husl.io', 'reporank60@gmail.com', 'support@pixelco.io', 'jay@algomizer.com', 'aj@driven.co.za', 
    'adkinsirisc@gmail.com', 'support@lexdraft.ai', 'dhruv@noclick.com', 'christianford741@gmail.com', 'dina@itjobscareers.com', 
    'bsandusky2026@gmail.com', 'cosentinoscott600@gmail.com', 'directory@blazehive.io', 'd33693515@gmail.com', 'support@silversentry.com', 
    'hello@novavoice.app', 'pierre@getmentions.ai', 'support@movescope.global', 'gregatqria@gmail.com', 'jessicakincaid74@gmail.com', 
    'contact@mortgagepaymentcalculator.io', 'info@agensi.io', 'hello@myswimscore.com', 'support@aituber.app', 'placysubmit@gmail.com', 
    'noreply@socialcrm.org', 'ramosdebbiet@gmail.com', 'barretbenton@gmail.com', 'bk@youscript.pro', 'homeprobadge@gmail.com', 
    'support@novelmint.ai',
    'evapetersons59@gmail.com', 'info@ilty.co', 'team@adcreate.com', 'chaeseungho6@gmail.com', 
    'joram7121@gmail.com', 'support@trybivy.ai', 'kkeithcollins7@gmail.com', 'support@resolverent.com', 
    'info@reti.media', 'agentkit750@gmail.com'
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
    
    # Generate the personalized embed code
    embed_target = f"https://realaiexamples.com/tools/{slug}?utm_source=badge&utm_medium=embed&utm_campaign=featured"
    embed_img = "https://realaiexamples.com/images/badge-dark.svg"
    embed_code = f'<a href="{embed_target}" target="_blank"><img src="{embed_img}" alt="Featured on REAL AI EXAMPLES" width="220" height="50" /></a>'

    text_body = f"""Hey,

Just letting you know I’ve added {tool_name} to the directory on Real AI Examples. You can see your listing here: {tool_url}

When I added a tool directory to the site, I just added tools for free so makers could "submit and forget" while I did the rest. But I've realized that for this to actually be useful to everyone, we need to trade some authority.

I’m moving to a "Verified" model where free listings include a "Featured" badge (or a simple backlink) in exchange for the listing. A few new makers have already done this, and I’m expecting a significant DR boost for the whole directory in the coming weeks as a result.

To keep your backlink active and stay in the main directory, please add the badge or a link by May 25th. 

Copy and paste this badge code:
{embed_code}

If you don't want to use the badge, a simple text link anywhere on your site (like a footer or "As Seen In" section) works too. You can just link the text "Featured on Real AI Examples" to your listing page. It only takes a minute but ensures we all get the SEO benefit from each other's efforts.

Best,
Akhil
Founder, RealAiExamples

P.S. If you have any suggestions or edits for your listing, just reply to this email and I’ll get it updated for you."""

    html_body = f"""<div style="background-color: #f9fafb; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
    
    <!-- Header/Branding -->
    <div style="padding: 32px 40px; border-bottom: 1px solid #f3f4f6;">
        <a href="https://realaiexamples.com" style="text-decoration: none; display: flex; align-items: center;">
            <img src="https://realaiexamples.com/logo-square.png" alt="Real AI Examples" width="32" height="32" style="border-radius: 4px; border: 1px solid #e5e7eb;">
            <span style="margin-left: 12px; font-size: 20px; font-weight: 800; color: #111827; letter-spacing: -0.025em;">Real AI Examples</span>
        </a>
    </div>

    <!-- Body -->
    <div style="padding: 40px; line-height: 1.6; color: #374151; font-size: 16px;">
        <p style="margin-top: 0; margin-bottom: 24px;">Hey,</p>
        
        <p style="margin-bottom: 24px;">Just letting you know I’ve added <strong>{tool_name}</strong> to the directory on Real AI Examples. You can see your listing here: <a href="{tool_url}" style="color: #064e3b; font-weight: 600; text-decoration: underline;">{clean_url}</a></p>

        <p style="margin-bottom: 24px;">When I added a tool directory to the site, I just added tools for free so makers could "submit and forget" while I did the rest. But I've realized that for this to actually be useful to everyone, we need to trade some authority.</p>

        <p style="margin-bottom: 32px;">I’m moving to a "Verified" model where free listings include a "Featured" badge (or a simple backlink) in exchange for the listing. A few new makers have already done this, and I’m expecting a significant DR boost for the whole directory in the coming weeks as a result.</p>

        <!-- Action Box -->
        <div style="margin-bottom: 32px; padding: 32px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;">
            <p style="margin-top: 0; margin-bottom: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #166534;">⚠️ Action Required</p>
            <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 18px; font-weight: 700; color: #064e3b;">Add Badge or Link by May 25th</h3>
            <p style="margin-bottom: 20px; font-size: 15px; color: #166534;">To keep your backlink active, please copy and embed this personalized badge code on your site:</p>

            <div style="background: #ffffff; padding: 16px; border: 1px solid #bbf7d0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #374151; word-break: break-all; margin-bottom: 20px; border-radius: 4px; line-height: 1.4;">
                {embed_code.replace('<', '&lt;').replace('>', '&gt;')}
            </div>

            <a href="{badge_url}" style="display: inline-block; font-size: 14px; color: #166534; font-weight: 700; text-decoration: underline;">Need a light variant or different size? Click here →</a>
        </div>

        <p style="margin-bottom: 24px;">If you don't want to use the badge, a simple text link anywhere on your site (like a footer or "As Seen In" section) works too. You can just link the text "Featured on Real AI Examples" to your listing page. It only takes a minute but ensures we all get the SEO benefit from each other's efforts.</p>

        <p style="margin-bottom: 0;">Best,<br>
        <strong>Akhil</strong><br>
        <span style="color: #6b7280; font-size: 14px;">Founder, RealAiExamples</span></p>
    </div>

    <!-- Footer -->
    <div style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center;">
        <p style="margin-top: 0; margin-bottom: 16px; font-size: 14px; color: #6b7280;">
            How People Actually Use AI at Work.
        </p>
        <p style="margin-bottom: 0; font-size: 12px; color: #9ca3af;">
            You're receiving this because you submitted a tool to Real AI Examples.
        </p>
    </div>
</div>
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

    # Create a lowercase set for faster, case-insensitive checks
    already_sent_lower = {e.lower() for e in ALREADY_SENT}

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
        if email_lower in seen_emails or email_lower in already_sent_lower:
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
    # Resend free plan limit is 100 per day
    process_and_send(limit=100)