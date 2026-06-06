# Participate-Only Static Version

This is the simple version for temporary use.

It does not need VPS hosting because it has no backend.

## What It Does

- Shows only the Participate form.
- Generates the e-certificate immediately after form submission.
- Sends participation data to `tarun.sharma22199@gmail.com` using FormSubmit.
- Sends a thank-you autoresponse to the participant's email address.
- Adds the participant email as CC, so they receive a confirmation copy even if autoresponse is delayed.
- Lets the user print/save the certificate as PDF.
- Works on normal static hosting.

## Hosting

Upload these files to any static hosting:

- `index.html`
- `styles.css`
- `app.js`

You can use:

- Hostinger basic/shared hosting
- GitHub Pages
- Netlify
- Any simple website hosting

## Important

This simple version sends submissions to the admin email through FormSubmit, sends a thank-you autoresponse to the participant, and also stores a local copy in the user's own browser local storage.

The first live submission may require email confirmation from FormSubmit. Open the confirmation email in `tarun.sharma22199@gmail.com` and approve it once.

For admin database, email delivery, CV uploads, and central records, use the full backend version:

```text
outputs/early-years-platform
```
