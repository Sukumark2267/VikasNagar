# Kuldeep Kumar — Vision Vikas 2027–32

A bilingual (Hindi-first) public communication website for the proposed Vision Vikas 2027–32 roadmap for Vikasnagar Assembly Constituency, Dehradun, Uttarakhand.

## Run locally

```bash
npm install
npm run dev
```

Create a local `.env` file before testing registrations:

```text
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Never place Google credentials or private keys in the frontend. The included Apps Script web app writes approved fields to Google Sheets and emails each registration to `kuldeep4vikasnagar@gmail.com`.

## Connect the Join Us form to Google Sheets

The Google account owner must complete this one-time authorization because a website cannot create a Sheet or send mail from an account using only its email address.

1. Open [Google Apps Script](https://script.google.com/) while signed in to the Google account that should own the registration Sheet, then create a new project.
2. Replace the editor contents with `google-apps-script/Code.gs` from this project.
3. Run the `setup` function once and approve the requested Google Sheets and email permissions. It creates `Vision Vikas 2027–32 — Join Us Registrations` in that account's Google Drive and prints its URL in the execution log.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then deploy.
5. Copy the deployed `/exec` URL into `.env` as `VITE_GOOGLE_SCRIPT_URL`, rebuild, and redeploy the website.

Open the `/exec` URL directly to confirm that the service returns a JSON health response. When the Apps Script code changes later, deploy a new version so the live `/exec` endpoint receives the update.

## Content updates

- Replace the SVG files in `src/assets/images/` with verified, permission-cleared photos.
- Update gallery entries in `src/data/galleryData.js`.
- Update video entries in `src/data/videoData.js`.
- Update social URLs in `src/data/socialLinks.js`.
- Update Hindi and English content in `src/data/hi.js` and `src/data/en.js`.

Unverified biographical, political and contact information is intentionally marked as placeholder content.
