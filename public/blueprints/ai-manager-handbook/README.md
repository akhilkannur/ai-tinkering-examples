# The AI Manager's Handbook

undefined


## Goal
To create a "Memory System" for your AI chats. Instead of explaining your brand voice, color codes, or formatting rules every single time you start a new chat, you will build a set of simple instructions (The Handbook) that you can reference instantly. This turns you from a "Prompter" into a "Manager."

## Tools Needed
- Any AI Chat (ChatGPT, Claude, Gemini)
- A Text Editor (Notepad, Google Docs, or VS Code)
- 15 Minutes

## Step-by-Step

### 1. Identify Your "Broken Records"
Think about the things you have to tell the AI over and over again.
*   "Don't use emojis."
*   "My brand color is #D4FF00."
*   "Always format the output as a table."
*   "Use short sentences."

### 2. Create Your "Agent Files"
Instead of one giant prompt, create small, focused text files (or notes) for each "Department" of your work.

**File 1: The Designer (`QA_DESIGN.txt`)**
> Contains your hex codes, font names, and visual preferences.
> *Example:* "Primary Color: Blue. Font: Helvetica. Style: Minimalist, no shadows."

**File 2: The Writer (`QA_VOICE.txt`)**
> Contains your tone, banned words, and formatting rules.
> *Example:* "Tone: Professional but friendly. Banned words: 'Delve', 'Tapestry'. Sentences: Under 15 words."

**File 3: The Manager (`README.txt`)**
> A master list of your projects and which "Agent" to use for them.

### 3. The "Onboarding" Prompt
When you start a new chat, don't type out the rules. Just copy-paste the relevant "Agent File" (or upload it if your AI supports files).

> **You:** "I am writing a blog post. Here are my rules from `QA_VOICE.txt`. Read them and confirm you understand before we start."

### 4. The "Audit" Workflow
When the AI finishes a task, don't just accept it. Ask it to check its own work against your rules.

> **You:** "Great draft. Now, act as my Editor. Read `QA_VOICE.txt` again and check your own work. Fix any sentences that are too long or use banned words."

## Prompt

Use this template to create your first "Agent File" (e.g., `QA_VOICE.md`).

```markdown
# [Your Brand Name] Voice & Style Guide

## 1. Core Identity
- **Who we are:** [e.g., A fun, non-technical guide to AI]
- **Who we talk to:** [e.g., Small business owners, not developers]
- **Tone:** [e.g., Helpful, Direct, slightly witty]

## 2. Formatting Rules
- [ ] Use **bold** for key concepts.
- [ ] Use bullet points for lists (no long paragraphs).
- [ ] Never use more than 2 emojis per post.

## 3. The "Banned" List
- Do not use: "Game-changer", "Revolutionary", "Unleash".
- Do not use passive voice (e.g., "Mistakes were made").

## 4. Final Quality Check
Before showing me the result, ask yourself:
1. Is this simple enough for a 10-year-old?
2. Did I follow the formatting rules above?

## Level 2: The Pro Upgrade (Agent Skills)

*Updated Jan 2026: The new "Agent Skills" feature makes this even easier.*

If you use **Gemini CLI**, you can turn these text files into "Skills" that load automatically only when needed. This saves memory and keeps the AI focused.

### How to use it:
1.  **Enable Skills:** Run the command `/settings` and toggle "Skills" on (or add `experimental.skills` to your config).
2.  **Convert your files:** Move your `QA_VOICE.md` into a specific `.gemini/skills/` folder (or define them in your config).
3.  **Automatic Activation:** Now, you don't even need to paste the file. If you ask for a blog post, the AI will say *"Activating Writing Skill..."* and load your rules instantly.

Think of it as **equipping a toolbelt**. You don't carry a hammer, a drill, and a saw in your hands all day. You pick up the drill (The Skill) only when you need to make a hole.
```


## Agent Implementation Guide
This tool is currently a stub. Your goal is to implement the logic described above in 
main.py
.