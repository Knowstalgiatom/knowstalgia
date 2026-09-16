KNOWstalgia — mobile-first nostalgia quiz app. See the project's `claude/master-brief.md` and `claude/beta-plan.md` for product context.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Phase 1 (Foundation) — what's here

- Design tokens: master brand + all seven decade theme palettes (`src/app/globals.css`, `src/lib/decades.ts`)
- Typography: Bricolage Grotesque (display) + Plus Jakarta Sans (UI), self-hosted via `@fontsource` so builds don't depend on reaching Google Fonts
- `KnowstalgiaLogo` component — coded placeholder wordmark per the locked logo spec, swap-in ready for the designer's final SVG
- Mobile-first global layout (`src/app/layout.tsx`, `src/components/container.tsx`)
- Beta passcode gate (`src/proxy.ts`, `src/app/gate/`) — set `KNOWSTALGIA_PASSCODE` to enable; unset = no-op
- `/` is a Foundation-phase proof page (logo + all 7 decade swatches), not the real decade selector — that's Phase 2

## Local development

```bash
npm install
npm run dev
```

Copy `.env.local.example` to `.env.local` and set `KNOWSTALGIA_PASSCODE` to test the gate locally.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
