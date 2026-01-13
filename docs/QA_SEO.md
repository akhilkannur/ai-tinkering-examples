# QA Checklist: SEO & Metadata

## Global Metadata Requirements (`pages/_app.tsx`)
- [ ] **Default Title:** Must be "AI Examples You Can Copy & Try".
- [ ] **Default Description:** Must be defined.
- [ ] **Key Attributes:** ALL `<meta>` tags must have a unique `key="name"` attribute (e.g., `key="description"`) to allow page-level overrides and prevent duplicates.
- [ ] **Favicon:** Must be linked with multiple sizes (ico, png, apple-touch-icon).
- [ ] **Canonical URL:** Must be present and stripping query parameters.

## Page-Specific Overrides
- [ ] **Dynamic Pages (`[...slug].tsx`):**
    - [ ] Must override `title`, `description`, `og:title`, `og:description`, `og:image`.
    - [ ] Must use `key="..."` matching the global tags to replace them.
- [ ] **Static Pages (About, Home):**
    - [ ] Must define specific `title` and `description` with `key` attributes.
- [ ] **URL Handling:**
    - [ ] `process.env.NEXT_PUBLIC_BASE_URL` must have a fallback (e.g., `|| 'https://realaiexamples.com'`) to prevent `undefined` in `og:url` or structured data.

## Social Media (Open Graph / Twitter)
- [ ] **Images:**
    - [ ] Every page must have an `og:image` and `twitter:image`.
    - [ ] Dynamic pages: Use the specific example screenshot.
    - [ ] Fallback: Use `Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png` from `/public`.
- [ ] **Card Type:** `twitter:card` should be `summary_large_image`.

## Technical SEO
- [ ] **Structured Data (JSON-LD):**
    - [ ] Homepage: `WebSite` schema with `SearchAction`.
    - [ ] Examples: `Article` schema with `headline`, `image`, `author`, `publisher`.
    - [ ] Breadcrumbs: `BreadcrumbList` schema for deeper navigation.
- [ ] **Sitemap:** `scripts/generate-sitemap.js` must run during build.
- [ ] **Robots:** `robots.txt` must allow crawling (unless specific exclusion needed).
