# Algofort App Development Landing Page

React, TypeScript, and Vite project for Algofort's app development service page. The hero keeps the existing headline and CTAs, uses a `#f0f0f0` background, and features an interactive sample mobile app. A service story sits to the left of the phone and clickable screen controls sit to its right. The phone opens on a home screen, lets visitors explore content, and includes an app project inquiry form.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` checks TypeScript and creates the production bundle.

## Brand starting point

- Wordmark: `public/brand/algofort-dark.png`
- Interactive preview: `src/App.tsx`
- Accent orange: `#f47a1f`
- Page background: `#f0f0f0`
- Near black: `#151616`
- Primary font: DM Sans

## Lead form

The in-phone form sends inquiries to `hello@algofort.com` using FormSubmit's AJAX endpoint. FormSubmit requires the recipient to activate the form using the email it sends after the first submission. Submissions stay with FormSubmit until activation, so verify the mailbox and activate the endpoint before publishing. The UI handles sending, success, and failure states, with a mailto fallback on failure.
