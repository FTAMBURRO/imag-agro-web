# IMAG AGRO SAS

Sitio público para presentar soluciones agropecuarias, orientar consultas de productores y abrir conversaciones directas por WhatsApp.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/imag-agro run dev` — run the public IMAG Agro website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env for the shared API: `DATABASE_URL` — Postgres connection string
- Optional web env: `VITE_SITE_URL`, `VITE_WHATSAPP_URL`, `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Public site: React + Vite + TypeScript + Wouter + Tailwind CSS

## Where things live

- `artifacts/imag-agro/src/content/` — editable site identity, solutions, and editorial articles.
- `artifacts/imag-agro/src/pages/public-pages.tsx` — public routes and client-only interactions.
- `artifacts/imag-agro/src/components/site-shell.tsx` — shared header, mobile menu, footer, and breadcrumb.
- `artifacts/imag-agro/public/` — favicon, manifest, robots, and generated sitemap.
- `artifacts/imag-agro/README.md` — local setup, content editing, assets, GitHub, and Vercel instructions.

## Architecture decisions

- The public site is self-contained and does not depend on the shared API or a database.
- WhatsApp is intentionally centralized in content/configuration; the advanced form remains hidden until a real number is configured.
- The initial visual system uses CSS/SVG field treatments so the public result does not depend on unlicensed stock photography.

## Product

The site presents eight agropecuary solutions, an interactive solution finder, editorial information for producers, contextual contact actions, responsive navigation, and a custom 404.

## User preferences

- Use Argentine Spanish with voseo.
- Do not invent commercial facts, staff profiles, phone numbers, prices, results, or exclusive representations.

## Gotchas

- Run the IMAG Agro lint, typecheck, and build commands after content or route changes.
- Set `VITE_SITE_URL` before a production build so the generated sitemap uses the definitive domain.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
