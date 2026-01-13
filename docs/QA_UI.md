# QA Checklist: UI & Design System

## Theme: "Digital Workshop"
The site uses a high-contrast, developer-centric "Digital Workshop" aesthetic. It replaces the old gradient/purple theme with a cleaner Slate/Acid Green palette.

## Core Color Palette
- [ ] **Backgrounds:**
    - Primary: `bg-primary-bg` (`#0f172a` - Slate 900)
    - Secondary/Cards: `bg-secondary-bg` (`#1e293b` - Slate 800)
- [ ] **Text:**
    - Headlines/Body: `text-text-color` (`#f8fafc` - Slate 50)
    - Subtitles/Meta: `text-text-secondary` (`#cbd5e1` - Slate 300)
- [ ] **Accents (Action Items):**
    - Primary Action: `text-accent` / `bg-accent` (`#D4FF00` - Acid Green)
    - Button Text (on accent): `text-electric-blue` (`#0f172a` - Dark Slate)
    - Borders: `border-navy-dark` (`#334155`)

## Typography
- [ ] **Headlines:** Must use `font-headline` or `font-mono` (Space Mono).
    - Style: Bold, often uppercase or tracking-tight.
- [ ] **Body Text:** Must use `font-sans` (Inter).
- [ ] **Code/Tags:** Must use `font-mono` (Space Mono).

## Components & Styling Rules
- [ ] **Buttons:**
    - Style: Rectangular, sharp corners (`rounded-none` or minimal rounded).
    - Hover: Simple color shift (`hover:bg-accent-hover`), no complex 3D effects.
- [ ] **Cards:**
    - Background: `bg-secondary-bg`.
    - Border: `border border-navy-dark` (Thin, visible borders).
    - Shadow: Minimal or none (`shadow-none` preferred).
- [ ] **Responsiveness:**
    - Mobile: Padding `px-4`.
    - Desktop: Max width containers (`max-w-4xl`, `max-w-6xl`).
    - Flex/Grid: Ensure columns stack on mobile (`grid-cols-1`) and expand on desktop.

## Legacy Mappings (Do Not Use)
- ❌ Do not use `bright-pink` (It is now mapped to Acid Green).
- ❌ Do not use `light-purple` for backgrounds (It is now dimmed text).
