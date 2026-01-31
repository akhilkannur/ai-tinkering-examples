import os
import requests
import time

# Audience: "Tool submissions"
AUDIENCE_ID = "7d20626b-66a6-4dfc-86db-6231d8a06e2b"

# List extracted from your send_emails.py
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

def get_api_key():
    if os.environ.get("RESEND_API_KEY"):
        return os.environ.get("RESEND_API_KEY")
    try:
        with open('.env.local', 'r') as f:
            for line in f:
                if line.strip().startswith('RESEND_API_KEY='):
                    return line.split('=', 1)[1].strip().strip('"').strip("'")
    except Exception:
        pass
    return None

def add_contact(email, api_key):
    url = f"https://api.resend.com/audiences/{AUDIENCE_ID}/contacts"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "email": email,
        "unsubscribed": False
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code in [200, 201]:
            print(f"✅ Added: {email}")
            return True
        else:
            print(f"❌ Failed {email}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error {email}: {str(e)}")
        return False

def main():
    api_key = get_api_key()
    if not api_key:
        print("Error: Could not find RESEND_API_KEY")
        return

    print(f"Backfilling {len(ALREADY_SENT)} contacts to Audience {AUDIENCE_ID}...")
    
    success_count = 0
    for email in ALREADY_SENT:
        if add_contact(email, api_key):
            success_count += 1
        time.sleep(0.2) # Rate limit safety
        
    print(f"\nFinished! Added {success_count}/{len(ALREADY_SENT)} contacts.")

if __name__ == "__main__":
    main()
