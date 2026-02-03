# Recipe Archetypes

## 1. Processor (User-Led)
**Use when:** The tool takes an existing file (CSV, PDF, TXT) and transforms it into a new format or filtered list.
**Logic Pattern:**
- Check for input file.
- Loop through rows/lines.
- Apply logic (cleaning, rewriting, analysis).
- Output a new file.

## 2. Researcher (AI-Led)
**Use when:** The tool starts with minimal input (like a company name or keyword) and goes to the web to find information.
**Logic Pattern:**
- Search for the entity/topic.
- Visit websites to extract data.
- Synthesize findings.
- Output a report or data sheet.

## 3. Hybrid
**Use when:** The tool uses an input file IF provided, but researches the web for missing information or to enrich the data.
**Logic Pattern:**
- Read file (if present).
- If data is missing or "Hybrid" mode is active, search the web.
- Combine local data with web data.
- Output enriched file.
