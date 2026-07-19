# Manan Mehta — Portfolio

A single-page personal portfolio built with **Next.js 14 (App Router)** + **Tailwind CSS**. Fully static — no backend, no CMS. Deploys to Vercel.

## Stack

- Next.js 14 (App Router, `output: 'export'` static build)
- Tailwind CSS
- TypeScript
- Google Fonts: Space Grotesk (display), JetBrains Mono (code), Inter (body)
- Zero animation libraries — typewriter, scroll reveal, and the kinematic arm are all hand-rolled

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs to ./out
```

## Deploy

Push to a Git repo and import into Vercel — it auto-detects Next.js. The included
`vercel.json` points the output directory at `out`.

## Customize before going live

- **Resume:** drop your PDF at `public/resume.pdf` (the Hero "Resume" button links to `/resume.pdf`).
- **Links:** update the `GITHUB_URL`, `LINKEDIN_URL`, and `EMAIL` constants in
  `components/Navbar.tsx` and `components/Contact.tsx`.
- **Project repo/demo links:** add `github` / `demo` fields to entries in
  `components/Projects.tsx` to show the icon links on each card.

## Structure

```
app/
  layout.tsx       fonts, metadata, global styles
  page.tsx         composes all sections
  globals.css      CSS variables + base resets
components/
  Navbar.tsx
  Hero.tsx         + KinematicArm.tsx
  About.tsx        + SkillGroup.tsx
  Projects.tsx     + ProjectCard.tsx
  Experience.tsx   mission-log timeline
  Contact.tsx
lib/
  hooks.ts         useTypewriter + useReveal (IntersectionObserver)
```
