# Ammar Akbar — AI/ML Engineer Portfolio

A premium, editorial portfolio built with Next.js, Tailwind CSS, Framer Motion, and Three.js. It focuses on showcasing production-grade AI engineering experience, particularly the OmniDrive AI ecosystem, with a clean, minimal aesthetic.

## Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Styling**: Tailwind CSS 4
- **Animations & Physics**: Framer Motion
- **3D Graphics**: Three.js & React Three Fiber (@react-three/drei)
- **Icons**: lucide-react

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

The project has been refactored to cleanly separate data from UI components:

- `src/app/` — Root layout, CSS variables, and main page structure.
- `src/components/` — Individual UI sections (Hero, FeaturedProjects, ExperienceTimeline, etc.).
- `src/data/` — Centralized data layer. Update these files to change portfolio content:
  - `site.ts`: Personal info, hero text, and navigation.
  - `projects.ts`: Flagship case studies (OmniDrive) and minor projects.
  - `experience.ts`: Professional timeline.
  - `skills.ts`: Categorized technical toolkit.

## Recent Updates (Sept 2026 Redesign)

- **UI/UX Pro Max**: Transitioned from a dark/neon glowing aesthetic to a clean, highly legible editorial light theme (`#FAF9F6`).
- **Interactive 3D**: Added a minimal, custom Three.js particle cloud to the hero section with `OrbitControls`.
- **Premium Interactions**: Integrated a custom, physics-based mouse cursor tracking system using Framer Motion.
- **Accurate Metrics**: Harmonized project metrics (OmniDrive: 26,820 images, 50 classes) with the CV.

## Production Checks

```bash
npm run lint
npm run build
```

## Deployment

Deploy easily on Vercel. Ensure all environment variables (if any) are set in the Vercel dashboard.
