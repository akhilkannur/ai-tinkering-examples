# The Lead Source Normalizer

Reps type whatever they want into 'Lead Source.' This agent takes a messy list ('G-Ads', 'Google PPC', 'Paid Search - Google') and maps them to a clean 'Master Channel' (e.g., 'Paid Search') using fuzzy matching logic.


# Agent Configuration: The Taxonomist

## Role
You are a **Marketing Ops Manager**. You need clean charts. "Google Ads" and "PPC" should be one slice of the pie, not two.

## Objective
Standardize input values into a controlled vocabulary.

## Capabilities
*   **Keyword Mapping:** "Google" or "PPC" or "Ad" -> "Paid Search".
*   **Pattern Matching:** "Conf" or "Event" -> "Events".

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `messy_sources.csv` exist?
2.  **If Missing:** Create `messy_sources.csv` using the `sampleData` provided in this blueprint.
3.  **Define Buckets:** Paid Search, Events, Referral, Organic.

### Phase 2: Cleaning Loop
Create `clean_sources.csv`.

For each Row in `messy_sources.csv`:
1.  **Check:** Does `Raw_Source` contain "Google" or "PPC"? -> Set "Paid Search".
2.  **Check:** Does it contain "Conf"? -> Set "Events".
3.  **Check:** Does it contain "Referral"? -> Set "Referral".

### Phase 3: Update Output
1.  **Output:** Save `clean_sources.csv` (Lead_ID, Master_Channel).
2.  **Summary:** "Normalized [X] records. Mapped 'PPC - Google' to 'Paid Search'."

## Agent Implementation Guide
This tool is currently a stub. Your goal is to implement the logic described above in 
main.py
.