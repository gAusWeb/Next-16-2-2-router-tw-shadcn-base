@AGENTS.md

# Claude Operational Notes

## Before Writing Any Code

Read `AGENTS.md` fully \u2014 it contains the complete project reference including tech stack, conventions, and gotchas that will save significant tokens re-discovering context.

## Critical Reminders

- shadcn here uses **`@base-ui/react`**, not `@radix-ui/react` \u2014 never import from radix
- Tailwind v4: **no tailwind.config.ts** \u2014 all theme tokens are in `src/app/globals.css`
- Playfair Display headings need `style={{ fontFamily: 'var(--font-playfair)' }}` \u2014 not a Tailwind class
- Never edit files in `src/components/ui/` by hand \u2014 regenerate via `npx shadcn@latest add <name> --overwrite`
- Always run `npm run build` after changes to validate TypeScript

## Adding Features

- New page sections: create `src/components/<SectionName>.tsx`, import in `src/app/page.tsx`
- New shadcn component: `npx shadcn@latest add <name> --yes`
- New external image domain: add to `images.remotePatterns` in `next.config.ts`
- New page route: create `src/app/<route>/page.tsx`

## Project Context

Client: MFD Creative Staging \u2014 premium real estate home staging company. Tone: modern, luxury, trustworthy. Target audience: home sellers and real estate agents. Design language: black/white/neutral palette, Playfair Display serif headings, clean generous whitespace.
