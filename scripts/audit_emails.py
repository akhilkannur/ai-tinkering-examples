import csv
import re
import os
from datetime import datetime

# ALREADY_SENT list from recovered send_emails.py
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

def get_live_tools():
    """Reads lib/ai-tools-data.ts and extracts the tool names and categories."""
    with open('lib/ai-tools-data.ts', 'r') as f:
        content = f.read()
    
    # Simple regex to find tool name and its category
    # Look for name: "...", and the following category: "..."
    tools = []
    # Find all tool blocks (roughly)
    blocks = content.split('  {')
    for block in blocks:
        name_match = re.search(r'name:\s*"(.*?)"', block)
        cat_match = re.search(r'category:\s*"(.*?)"', block)
        if name_match and cat_match:
            tools.append({
                'name': name_match.group(1).strip(),
                'category': cat_match.group(1).strip()
            })
    return tools

def audit():
    live_tools = get_live_tools()
    print(f"Total live tools in lib: {len(live_tools)}")

    submissions = []
    with open('latest_submissions.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get('Please enter your contact email', '').strip() or row.get('Email address', '').strip()
            name = row.get('What is the name of your tool', '').strip()
            url = row.get('What is the URL where your tool can be accessed?', '').strip()
            if email and name:
                submissions.append({
                    'email': email.lower(),
                    'name': name,
                    'url': url
                })

    print(f"Total submissions in CSV: {len(submissions)}")

    # Map tool names (and maybe URLs) to emails from submissions
    tool_to_email = {}
    for sub in submissions:
        # Using lowercase name as key for easier matching
        tool_to_email[sub['name'].lower()] = sub['email']
        # Also try to clean up URL to use as a backup key?
        # But name is usually better if they match exactly.

    to_notify = []
    already_sent_count = 0
    missing_submission_count = 0

    for tool in live_tools:
        name_lower = tool['name'].lower()
        if name_lower in tool_to_email:
            email = tool_to_email[name_lower]
            if email in ALREADY_SENT:
                already_sent_count += 1
            else:
                to_notify.append({
                    'name': tool['name'],
                    'email': email,
                    'category': tool['category']
                })
        else:
            missing_submission_count += 1

    print(f"\nAudit Results:")
    print(f"- Already notified: {already_sent_count}")
    print(f"- Missing submission info (can't find email): {missing_submission_count}")
    print(f"- PENDING NOTIFICATION: {len(to_notify)}")
    
    if to_notify:
        print("\nPending tools:")
        for t in to_notify:
            print(f"- {t['name']} ({t['email']}) [{t['category']}]")

if __name__ == "__main__":
    audit()
