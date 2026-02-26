---
id: testimonial-extractor
category: Strategic Ops
title: The Testimonial Factory
tagline: Process 50 calls into a website-ready library.
time: 10 mins
description: >-
  Your customers say amazing things on Zoom, but it gets lost. This agent scans
  a folder of call transcripts, extracts the 'Aha! Moments', and generates a
  structured testimonial database.
sampleData:
  filename: transcripts/call_1.txt
  content: >
    User: "I really loved how easy the automation setup was. Before this, I was
    spending 10 hours a week on it. Now it takes 2 minutes."
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Testimonial Factory

## Role
Your customers say amazing things on Zoom, but it gets lost. This agent scans a folder of call transcripts, extracts the 'Aha! Moments', and generates a structured testimonial database.

## Objective
Process 50 calls into a website-ready library.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `transcripts/call_1.txt` exist?
2.  **If Missing:** Create `transcripts/call_1.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **Initialize:** Create `testimonial_database.csv` with headers: `Source_File,Client_Name,Quote,Category,Metric_Found`.

**Phase 2: The Extraction Loop**
For each `.txt` file in `transcripts/`:
1.  **Scan:** Find phrases signaling success (e.g., "Loved", "Saved", "Helped").
2.  **Extract:** Isolate the specific quote and the metric (e.g., "10 hours").
3.  **Clean:** Remove filler words while keeping the customer's voice.

**Phase 3: Final Output**
1.  **Append:** Write results to `testimonial_database.csv`.
2.  **Summary:** "Processed [X] transcripts. Found [Y] ROI-based testimonials."

