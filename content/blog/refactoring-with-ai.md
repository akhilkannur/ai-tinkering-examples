---
title: "Cleaning Messy Data: I Turned 200 Junk Files into Gold in 10 Mins"
date: "2026-01-23"
excerpt: "I had 200 text files that were completely unusable. Instead of learning Regex (which I hate), I wrote a simple guide and let the AI do the boring work."
coverImage: "/images/blog/refactoring-with-ai.png"
author: "Akhil Nair"
category: "Engineering"
---

I opened my "scraped_data" folder yesterday and almost deleted the whole thing.

It was a graveyard of 200 text files I’d collected over the last year—notes, copy-pasted articles, half-finished ideas. I wanted to turn them into the "Blueprints" you see on this site.

But the data was garbage.
Some files used "Goal:" headings. Others used "Objective:". Some were just random bullet points.

To fix this the "right" way, a developer would write a Python script using **Regex**.
If you’ve never seen Regex, it looks like this: `^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$`.

Yeah. No thanks.
I am not learning that just to clean up some text files.

## Prompt Engineering > Coding

Instead of writing code, I tried something dumb. I treated the AI like an intern.

I created a new file called `MIGRATION_GUIDE.md` and just... wrote in English.

I literally put:
> "Hey, look at this messy file. I want you to find the title (it's usually the first line) and the goal. Then rewrite the whole thing so it looks like this clean example below."

Then I ran the command:
> *"Read the guide. Then go through every file in the folder and fix them."*

## It Actually Worked

I watched the terminal as it chewed through the files.
It was kinda spooky.

*   It found typos I missed ("Obejctive") and fixed them.
*   It guessed the category of the blueprint based on the text (tagging sales stuff as "Sales" and code stuff as "Engineering").
*   It formatted everything into perfect Markdown.

A rigid script would have choked on half these files. The AI just "got it."

## Why I'm Writing This

I talk to a lot of founders who are sitting on piles of messy data—customer feedback, old leads, meeting notes. They think they need to hire a data scientist to clean it up.

You don't. You just need to write a good set of instructions.

We're at a weird point in tech where writing a polite memo to a computer is more effective than writing actual code. I'm here for it.