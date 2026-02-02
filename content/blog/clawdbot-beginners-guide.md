---
title: "Moltbot (formerly Clawdbot) 101: What It Is and How to Install It (Updated Guide)"
date: "2026-02-02"
excerpt: "Moltbot (previously Clawdbot) is trending everywhere. But what is it? Do you need a Mac Mini? Is it free? This updated guide covers the rename, Cloudflare hosting, and setup."
coverImage: "/images/blog/clawdbot-guide.png"
author:
  name: "Akhil from Real Examples"
category: "AI Tools"
---

**Update (February 2026):** The project formerly known as **Clawdbot** has been renamed to **Moltbot**. This guide has been updated to reflect the new name and new hosting options like Cloudflare.

Everyone's talking about Moltbot. Mac Minis are selling out. Twitter is flooded with screenshots of people chatting with their "personal AI assistant" on WhatsApp.

But if you're not a developer, you're probably confused.

What even *is* Moltbot? Do you really need to buy hardware? And how hard is it to set up?

I'm going to answer every question I've seen trending, then walk you through the setup—even if you've never touched a terminal.

## What Is Moltbot?

**Moltbot is a free, open-source AI assistant that runs on your own computer (or cloud host).**

Unlike ChatGPT or Claude (which live on a website), Moltbot:

- **Runs locally** on your machine (or on a server you control)
- **Connects to apps you already use**—WhatsApp, Telegram, Discord, Slack, Signal, iMessage
- **Remembers your conversations** over time
- **Can be proactive**—sending you reminders, briefings, and alerts
- **Keeps your data private** because it never leaves your device

Think of it as having a smart assistant that lives *inside* your messaging apps, not behind a browser tab.

## Why Is Everyone Buying Mac Minis?

Here's the myth: *"You need a Mac Mini to run Moltbot."*

**False.**

Moltbot runs on:
- Any Mac (even old ones)
- Any Windows PC (using WSL2)
- Any Linux machine
- **Cloudflare** (New! Run it on the edge)
- A $5/month cloud server (DigitalOcean, Hetzner)
- AWS Free Tier (literally $0)

People buy Mac Minis because they want a dedicated, always-on device sitting in their house. It's a luxury, not a requirement.

If you have a laptop that's on most of the time, that works too. But recently, providers like **Cloudflare** have started offering hosting solutions specifically for Moltbot, making it even easier to run without hardware.

## Is Moltbot Free?

The software is 100% free and open-source.

But you need an AI model to power it. Options:

| Option | Cost |
|--------|------|
| Claude Pro/Max subscription | $20-100/month |
| Anthropic API key | Pay per use (~$0.01 per message) |
| OpenAI API key | Pay per use |
| Local models (LM Studio) | Completely free |

The cheapest path? Use local models. Your data stays on your machine, and you pay nothing.

## Is Moltbot Made by Anthropic?

No. Moltbot is an independent, community-built project.

It *can* use Claude (the AI model from Anthropic), but Anthropic didn't build Moltbot. It's not "Claude's official app." (This is partly why it was renamed from Clawdbot to Moltbot—to avoid confusion!)

## Is My Data Safe?

Yes. Everything runs on YOUR infrastructure.

Your conversations, files, and personal data never leave your control. That's the whole point—it's a self-hosted assistant.

## What Can Moltbot Actually Do?

Here's why people are excited:

**1. Personal Knowledge Manager**
Drop a link in Telegram. Moltbot summarizes it, categorizes it, and files it away. No more lost bookmarks.

**2. Meeting Prep**
Ask: *"What are my action items from last week?"* or *"Summarize our project status."* It remembers past conversations.

**3. Proactive Reminders**
Set up morning briefings, flight alerts, or task follow-ups. It messages YOU instead of waiting to be asked.

**4. Research Assistant**
It can search the web, summarize articles, and analyze documents.

**5. Multi-App Access**
Talk to it from WhatsApp while you're on your phone. Switch to Discord on desktop. Same assistant, same memory.

---

## How to Install Moltbot (Beginner-Friendly)

Don't worry—there's a wizard that walks you through everything.

### Step 1: Check Node.js

Open your terminal:
- **Mac:** Spotlight → Terminal
- **Windows:** Use WSL2 (Windows Subsystem for Linux)
- **Linux:** You know what to do

Type:
```
node --version
```

You need version 22 or higher. If it's missing, download from https://nodejs.org.

### Step 2: Install Moltbot

Paste this command (works for the new Moltbot version):

```
curl -fsSL https://molt.bot/install.sh | bash
```

*(Note: The old clawd.bot installer still works and redirects, but this is the new standard.)*

Wait a minute or two.

### Step 3: Run the Setup Wizard

```
moltbot onboard
```

The wizard asks you:
1. **Gateway mode:** Choose "Local" (or "Cloudflare" if you're using that method)
2. **AI Model:** Pick Anthropic, OpenAI, or local
3. **Authentication:** Paste your API key
4. **Messaging app:** WhatsApp, Telegram, Discord, etc.
5. **Run in background:** Choose "Yes"

### Step 4: Connect Your Messaging App

**Telegram (easiest):**
1. Message `@BotFather` on Telegram
2. Type `/newbot`
3. Copy the token it gives you
4. Paste into the wizard

**WhatsApp:**
1. Scan the QR code shown in terminal
2. Done

### Step 5: Say Hello

Open your messaging app and message your bot:

> "Hello, what can you do?"

🎉 You now have a personal AI assistant.

---

## The $0 Setup

Want to spend nothing?

1. **Hosting:** Use AWS Free Tier or **Cloudflare's Free Workers** plan.
2. **AI Model:** Use LM Studio with Llama 3 (runs locally, $0)
3. **Result:** A working AI assistant for literally zero dollars

You don't need a Mac Mini. You don't need a subscription. You just need to follow the steps.

---

## Troubleshooting

**"Command not found: moltbot"**
Restart your terminal after installation.

**"No credentials found"**
Re-run `moltbot onboard` and set up authentication again.

**"Rate limit error"**
Your AI provider's quota is exhausted. Wait or upgrade.

**Still stuck?**
Run these:
```
moltbot status
moltbot doctor
moltbot health
```

Or ask in the Discord: https://discord.com/invite/moltbot

---

## Quick Commands Reference

| Command | What It Does |
|---------|-------------|
| `moltbot onboard` | Setup wizard |
| `moltbot status` | Check if running |
| `moltbot health` | Diagnose issues |
| `moltbot doctor` | Auto-fix problems |
| `moltbot gateway start` | Start the service |

---

## Why This Matters

We're at an inflection point.

AI assistants used to live in browser tabs. Now they're moving into the tools we actually use—messaging apps, file systems, calendars.

Moltbot is one of the first to do this well, and it's completely open-source.

You don't need to be technical. You don't need expensive hardware. You just need 30 minutes and curiosity.

The future of personal AI is self-hosted. And the setup is easier than you think.