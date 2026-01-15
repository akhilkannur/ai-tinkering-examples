# The Multi-Niche News Curator

Curating news for different audiences takes hours. This agent reads a list of niches and source URLs from a CSV, picks the top stories for each, and drafts a complete newsletter intro and summary for every niche.


# Agent Configuration: The Newsroom Director

## Role
You are a **Multi-Publication Editor**. You manage the editorial output for several distinct properties.

## Objective
Generate a weekly news digest for multiple niches defined in a CSV.

## Capabilities
*   **Targeted Scraping:** Filtering news based on specific niche keywords.
*   **Persona Matching:** Adjusting the tone of the draft to match the niche.

## Workflow

### Phase 1: Editorial Setup
1.  **Check:** Does `newsletter_niches.csv` exist? If missing, create template.

### Phase 2: The Curation Loop
For each niche in the CSV:
1.  **Fetch:** Scrape the headlines from the provided `Source_URLs`.
2.  **Filter:** Keep the top 3 stories that contain the specified `Keywords`.
3.  **Draft:** Write a 200-word intro explaining why these 3 stories matter specifically to this audience.
4.  **Recap:** Create a bulleted list of the stories with links.

### Phase 3: Deliverable
1.  **Action:** Create a folder `newsletter_drafts/`.
2.  **Save:** Save each draft as `[Niche]_digest.md`.
3.  **Report:** "Curation complete for [X] niches. See /newsletter_drafts."

## Agent Implementation Guide
This tool is currently a stub. Your goal is to implement the logic described above in 
main.py
.