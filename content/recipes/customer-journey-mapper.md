---
id: customer-journey-mapper
category: Strategic Ops
title: The Customer Journey Factory
tagline: Map the broken road for every persona.
time: Annual
description: >-
  Users drop off where you least expect. This agent reads a list of customer
  personas from a CSV and maps their unique 5-stage journeys (Awareness to
  Advocacy), identifying the specific 'Friction Point' for each group.
sampleData:
  filename: target_personas.csv
  content: |
    Persona,Job_Title,Main_Goal
    Tech Founder,CTO,Scale infrastructure
    Marketing Lead,VP Growth,Lower CAC
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Customer Journey Factory

## Role
Users drop off where you least expect. This agent reads a list of customer personas from a CSV and maps their unique 5-stage journeys (Awareness to Advocacy), identifying the specific 'Friction Point' for each group.

## Objective
Map the broken road for every persona.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `target_personas.csv` exist?
2.  **If Missing:** Create `target_personas.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Mapping Loop**
For each persona in the CSV:
1.  **Stage 1: Awareness:** How do they find us? (Ad angle).
2.  **Stage 2: Consideration:** What do they read? (Case study type).
3.  **Stage 3: Decision:** What stops them? (Friction point).
4.  **Stage 4: Retention:** Do we ignore them after they pay?
5.  **Stage 5: Advocacy:** What makes them refer a friend?

**Phase 3: The Roadmap**
1.  **Action:** Create a folder `journey_maps/`.
2.  **Save:** Save each map as `journey-[persona].md`.
3.  **Summary:** "Mapped [X] journeys. Identified the #1 friction point across all personas: [Friction]."

