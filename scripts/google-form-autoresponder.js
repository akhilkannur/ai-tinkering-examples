/**
 * Google Apps Script — Auto-responder for tool submission form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Add FORM_WEBHOOK_SECRET env var to Vercel (run: openssl rand -hex 16)
 * 2. Open Google Form: https://docs.google.com/forms/d/1sK9GGhyRiwy_afzMinnxGLEUYaNMdksl-Hco0RUhqyM/edit
 * 3. Click three dots menu (⋮) → Script editor
 * 4. Paste everything below the dashed line into the script editor
 * 5. Replace YOUR_FORM_WEBHOOK_SECRET_HERE with the actual secret from step 1
 * 6. Save the script
 * 7. Click Triggers (clock icon, left sidebar) → Add Trigger:
 *    - Function: onFormSubmit
 *    - Event source: From form
 *    - Event type: On form submit
 *    - Click Save and authorize
 * 
 * HOW IT WORKS:
 * - On form submit, Apps Script calls our Vercel API route /api/form-submission
 * - That route sends an email via Resend from akhil@mail.realaiexamples.com
 * - Email tells submitter: reviewed in 7 days + badge CTA for priority review
 * 
 * API ROUTE: pages/api/form-submission.ts (already created)
 * 
 * NOTE: Adjust the field name keys ("Email", "Tool Name") below to match
 * your form's exact field labels. Check the form response spreadsheet headers.
 * --------------------------------------------------------------------------
 */

function onFormSubmit(e) {
  var responses = e.namedValues;

  // Adjust these keys to match your exact form field names
  var email = (responses["Email"] || responses["email"] || responses["Email Address"] || [""])[0].trim();
  var toolName = (responses["Tool Name"] || responses["Product Name"] || responses["Name"] || ["your tool"])[0];

  if (!email) return;

  UrlFetchApp.fetch("https://realaiexamples.com/api/form-submission", {
    method: "post",
    contentType: "application/json",
    headers: { "x-webhook-secret": "YOUR_FORM_WEBHOOK_SECRET_HERE" },
    payload: JSON.stringify({ email: email, toolName: toolName })
  });
}
