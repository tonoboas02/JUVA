# JUVA — Wellness. Strength. Longevity.

Landing page for **JUVA**, a private wellness, performance, and longevity club in Quito, Ecuador.

Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

---

## Customization Guide

### Brand Colors
All color tokens are defined in two places:
- `tailwind.config.ts` → `theme.extend.colors` — used for Tailwind utility classes
- `src/app/globals.css` → `:root` CSS variables — used for raw CSS

Change any `juva-*` color value in either file to update the entire site.

### Typography
Fonts are imported via Google Fonts in `src/app/globals.css` (`@import` at the top).
- **Headlines:** Cormorant Garamond
- **Body:** Inter

To change fonts, update the `@import` URL and the `fontFamily` entries in `tailwind.config.ts`.

### Images
All image placeholders use `<div>` elements with gradient backgrounds and a `data-image-placeholder` attribute. Search the codebase for `data-image-placeholder` to find every placeholder:

```bash
grep -r "data-image-placeholder" src/
```

Replace each `<div>` with a Next.js `<Image>` component and your real photo. Each placeholder has a comment directly above it explaining what the ideal photo should look like.

### Equipment / Services List
Edit `src/lib/data.ts` to update:
- **Experience Cards** — the 4 main category cards (`experienceCards` array)
- **Technologies** — the 8 equipment/service cards (`technologies` array)
- **Sanctuary Spaces** — the 3 editorial image blocks (`sanctuarySpaces` array)

No component files need to be touched for content changes.

### Form Behavior
The membership form in `src/components/MembershipCTA.tsx` currently shows a success message on submit without sending any data. To connect a real backend:

1. Find the `handleSubmit` function in `MembershipCTA.tsx`
2. Replace the `setTimeout` mock with a `fetch` call to your API endpoint or a service like Resend, Formspree, or Make.com
3. Handle errors by adding a `setError` state and displaying a friendly error message

### WhatsApp & Instagram Links
Edit the constants at the top of `src/components/Footer.tsx`:

```ts
const INSTAGRAM_URL = "https://instagram.com/juva.ec";
const WHATSAPP_URL  = "https://wa.me/593XXXXXXXXX";
const EMAIL         = "hola@juva.ec";
```

### Grain Overlay Intensity
In `src/app/globals.css`, find `:root` and adjust `--grain-opacity`:
- `0` = off
- `0.04` = default (subtle)
- `0.08` = heavy

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          — Root layout, metadata, font setup
│   ├── page.tsx            — Page assembly (imports all components)
│   └── globals.css         — Tailwind, Google Fonts, grain overlay, utilities
├── components/
│   ├── Navbar.tsx          — Fixed nav, scroll behavior, mobile menu
│   ├── Hero.tsx            — Full-screen hero with parallax and animations
│   ├── PhilosophySection.tsx
│   ├── ExperienceCards.tsx — 4 glassmorphism category cards
│   ├── SignatureTechnologies.tsx — 8-item equipment grid
│   ├── SanctuarySection.tsx — Editorial interior spaces grid
│   ├── MembershipCTA.tsx   — Early-access form with success state
│   └── Footer.tsx          — Static footer with social links
└── lib/
    └── data.ts             — All site content data (edit here for content updates)
```

---

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 14 |
| TypeScript | 5 |
| Tailwind CSS | 3 |
| Framer Motion | 12 |
| Google Fonts | Cormorant Garamond + Inter |
