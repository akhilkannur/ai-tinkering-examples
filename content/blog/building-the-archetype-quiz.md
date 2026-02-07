---
title: "I Built a Viral Quiz in 3 Hours (And I Don't Know React)"
date: "2026-01-23"
excerpt: "I wanted a BuzzFeed-style personality quiz to segment my users. I didn't want to pay for Typeform or learn state management. So I hacked it together with AI."
coverImage: "/images/blog/quiz-architecture.png"
author:
  name: "Akhil from Real Examples"
category: "Engineering"
---

I’ll admit it: I love personality quizzes.
*"Which Harry Potter House Are You?"*
*"What Kind of Pizza Are You?"*

> **TL;DR:** I don't know how to code complex React apps. But I wanted a viral quiz. So I asked an AI agent to "act as a psychologist" to write the questions, and then "act as a developer" to write the code. It worked in 3 hours.

It’s narcissism. We love hearing about ourselves.
I realized if I wanted people to actually care about "AI Workflows," I couldn't just give them a boring list. I had to make it about *them*.

I wanted to build a "Which AI Archetype Are You?" quiz.
**Speedster? Builder? Analyst?**

## The Problem

I had the idea, but building a quiz app is actually annoying.
You have to track scores. You have to handle the "Next" button. You have to calculate the winner at the end.
In React code, that means `useState`, `useEffect`, and a bunch of logic I honestly don't fully grasp.

## The "Psychologist" Trick

First, I needed the questions. I didn't write them.
I told Gemini:
> *"Act as a workplace psychologist. Write 5 questions to diagnose if someone is obsessed with efficiency, data, or creativity. Make the answers funny/relatable."*

It came up with stuff like: *"What drains your battery? A) Emails, B) Spreadsheets."*
Boom. Content done.

## The "Coder" Trick

Then I took that text and pasted it right back into the CLI.
> *"Make me a React component for this. Make it look like Typeform - one question at a time. Smooth progress bar. At the end, tell them their Archetype."*

It spat out a file. I dropped it into my `components` folder.
It worked on the first try. (Okay, the second try. The first time the progress bar was broken).

## Dynamic Recommendations

Here is the cool part.
The quiz doesn't just give you a badge. It changes the website.

If you get **"Speedster"**, the site recommends email automation tools.
If you get **"Builder"**, it shows you code templates.

I didn't have to code complex routing rules. I just asked the AI: *"Map these results to these file IDs."*

## Just Build It

I think a lot of non-technical founders get stuck on the "How."
*"How do I build a quiz logic?"* *"How do I design the buttons?"*

Who cares?
Focus on the **What**.
I knew *what* I wanted (a viral quiz). The AI figured out the *how*.

I built a feature in an afternoon that would have taken me a week to learn manually. That's the only metric that matters.
