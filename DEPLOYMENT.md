# Deployment & Build Instructions

## Build Process
*   **Method:** Push directly to GitHub.
*   **CI/CD:** Vercel (or connected service) handles the build from the repository.
*   **Local Build:** **SKIP**. Do not run `npm run build` locally for deployment purposes. Only use it for debugging specific local errors if absolutely necessary, but prefer pushing to remote to trigger the official pipeline.

## Reason
To ensure consistent deployment environments and avoid local configuration discrepancies.
