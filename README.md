# Portfolio

Personal portfolio site for Bhanuja Sanghavi — Next.js, MDX case studies, Tailwind CSS v4.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npm run test     # Unit tests (Vitest)
```

## Project structure

- `app/(main)/` — Home page
- `app/work/[slug]/` — Case study pages (MDX in `app/content/projects/`)
- `app/styles/` — CSS modules imported by `app/globals.css`
- `app/lib/brand-colors.json` — Color primitives synced with `@theme` in `app/styles/tokens.css`
