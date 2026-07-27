# Dauda Nasir Portfolio

A personal portfolio website for Dauda Nasir Omotola (aka Raregazetto). It presents his engineering work, skills, and projects through a fast single page application with an embedded AI assistant. The live site is available at https://raregazzetto.me.

## Who it is for

This site is built for:

- Recruiters and hiring managers evaluating Dauda's backend, mobile, and AI engineering experience.
- Potential collaborators and clients who want a clear view of past projects and capabilities.
- Anyone curious about his work across Python, Flutter, cloud infrastructure, and AI-integrated systems.

## Live site

https://raregazzetto.me

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 6 |
| AI features | @google/genai (Google Gemini) |
| Animation | framer-motion |
| Icons | lucide-react |
| Styling | Tailwind CSS (via CDN config in index.html) |
| Hosting | GitHub Pages (custom domain) |
| CI/CD | GitHub Actions |

## Key features

- Single page application with hash based routing for project case study views (no full page reloads).
- Hero section with an animated network background and scroll reveal transitions.
- Projects showcase highlighting seven featured builds: Engineering Hub, NUESA Academia, RAG Data Pipeline, TRAKS, AWUN, Soiling Detection System, and RAST.
- Detailed case study and documentation views for each major project.
- Skills section organized into Core Engineering, Cloud Infrastructure, AI and Intelligence, and DevOps and Delivery.
- About and Contact sections with direct social and email links.
- Embedded AI chat assistant (bottom right) powered by Google Gemini. It answers visitor questions about Dauda's skills, experience, and projects using a curated system instruction.
- Light and dark theme support (class based dark mode).
- SEO ready: Open Graph and Twitter tags, canonical link, and JSON-LD Person schema in index.html.
- Downloadable CV served from the public folder.

## Project structure

- `App.tsx`: top level component, hash routing, and document title management.
- `components/`: UI sections (Hero, About, Skills, Portfolio, Contact) and per project case study views.
- `services/geminiService.ts`: Gemini client and chat logic for the AI assistant.
- `constants.ts`: copy, skill data, project data, social links, and the assistant system instruction.
- `index.html`: HTML shell with Tailwind config, fonts, SEO metadata, and schema markup.
- `vite.config.ts`: Vite configuration and API key exposure.
- `.github/workflows/node.js.yml`: GitHub Actions workflow that builds and deploys to GitHub Pages.

## Local development

Prerequisites: Node.js 20 or newer.

1. Install dependencies:

   ```bash
   npm install
   ```

2. (Optional) Create a `.env.local` file in the project root and set your Gemini API key. This enables the AI chat assistant locally:

   ```bash
   API_KEY=your_gemini_api_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The site will be available at the local address printed by Vite (typically http://localhost:5173).

## Build

To create a production build:

```bash
npm run build
```

This runs the TypeScript compiler and then Vite. Output is written to the `dist/` directory. Preview the production build locally with:

```bash
npm run preview
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `API_KEY` | Google Gemini API key used by the AI chat assistant. Required for the assistant to respond. In CI it is supplied through the repository `API_KEY` secret. |

## Deployment

Deployment is automatic. A GitHub Actions workflow (`.github/workflows/node.js.yml`) runs on every push to the `main` branch. It installs dependencies, builds the project with the `API_KEY` secret, and publishes the `dist/` output to GitHub Pages. The site is served from the custom domain `raregazzetto.me` (configured via `public/CNAME`).

No manual deployment step is required. Merging to `main` triggers the release.

## Canonical note

This repository is the canonical personal portfolio for Dauda Nasir Omotola, a Systems Engineer focused on Backend and Mobile development with AI-Integrated Systems. It is the authoritative source for the site at https://raregazzetto.me.
