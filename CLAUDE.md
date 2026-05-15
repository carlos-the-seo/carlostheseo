# CarlosTheSEO — Personal Brand Site

## Project
Personal website for Carlos Morones, SEO + AI Consultant. Built with Astro + Tailwind v4 + React islands + Sanity CMS + Cloudflare Pages.

## Stack
- **Astro 6** — static pages, content collections
- **Tailwind v4** — via `@tailwindcss/vite` plugin (NO tailwind.config.js needed, use `@theme` in global.css)
- **React 19** — islands only for interactive components (chatbot, contact form)
- **Sanity** — headless CMS for services, locations, case studies, tools (not yet wired)
- **Cloudflare Pages** — hosting + Workers for API routes
- **Domain** — carlostheseo.com

## Brand
- **Positioning:** SEO operator who builds systems, not just reports
- **Voice:** Direct, builder energy, specific tools named, no buzzwords
- **Palette:** Dark (#08080f bg), surface (#0f0f1a), orange accent (#f97316)
- **Tone:** High trust, high expectation — writes for people who already know SEO

## Site Structure
- `/` — Homepage
- `/services` — Services overview
- `/services/[service]/[location]` — Programmatic service × location (Sanity)
- `/tools` — Tools Carlos has built (Sentinel, pipeline, schema packages)
- `/case-studies` — Client results
- `/blog` — SEO × AI content (Astro Content Collections, Markdown)
- `/contact` — Lead capture (Cloudflare Worker + Resend)

## Key Rules
- All static pages are `.astro` — React only when interactivity is required
- Tailwind v4: use `@theme` variables in global.css, NOT tailwind.config.js
- Import global.css in Layout.astro only
- Sanity not yet installed — use placeholder data for now, wire later
- No stock photos, no vague AI copy — everything grounded in real tools/results

## Brand Proof Points (use in copy)
- 24 active clients monitored daily via Sentinel
- 38-file SEO content pipeline in production
- 9-file JSON-LD schema packages delivered per client
- Multi-source audits: Ahrefs + Search Atlas + GA4 + GSC
