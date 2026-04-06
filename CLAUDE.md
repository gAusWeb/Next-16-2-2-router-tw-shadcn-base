@AGENTS.md

# Claude Operational Notes

## Before Writing Any Code

Read `AGENTS.md` fully — it contains the complete project reference including tech stack, all components, conventions, and gotchas.

## Critical Reminders

- shadcn here uses **`@base-ui/react`**, not `@radix-ui/react` — never import from radix
- Tailwind v4: **no tailwind.config.ts** — all theme tokens are in `src/app/globals.css`
- Playfair Display headings need `style={{ fontFamily: 'var(--font-playfair)' }}` — not a Tailwind class
- Never edit files in `src/components/ui/` by hand — regenerate via `npx shadcn@latest add <name> --overwrite`
- **lucide-react has no social icons** — use `react-icons/ri` for Instagram/LinkedIn/Facebook
- Always run `npm run build` after changes to validate TypeScript

## Adding Features

- New **home page** section: create `src/components/<SectionName>.tsx`, import in `src/app/page.tsx`
- New **standalone page**: create `src/app/<route>/page.tsx`; pass `initialTheme="light"` to `<Navigation />` if no full-screen dark hero
- New shadcn component: `npx shadcn@latest add <name> --yes`
- New external image domain: add to `images.remotePatterns` in `next.config.ts`
- New CSS token: add to `@theme inline {}` in `src/app/globals.css`
- **Footer duplication:** the footer is inlined in both `src/app/page.tsx` and `src/app/portfolio/page.tsx` — update both when changing footer content/links

## Before Going Live (Placeholders to Replace)

- **Phone number** in `src/components/ContactInfo.tsx` → `phoneParts` array
- **Email address** in `src/components/ContactInfo.tsx` → `emailParts` array
- **Social URLs** in `src/components/SocialLinks.tsx` → `socials` array
- **Portfolio images** in `src/components/PortfolioSection.tsx` → `PROJECTS` array `src` strings (and add real image domain to `next.config.ts` if not picsum)
- **Hero images** in `src/components/HeroSlideshow.tsx` → `slides` array `src` strings
- **Why Us image** in `src/components/WhyUsSection.tsx` → picsum `src`

## Project Context

Client: MFD Creative Staging — premium real estate home staging company. Tone: modern, luxury, trustworthy. Target audience: home sellers and real estate agents in Melbourne, Australia. Design language: black/white/neutral palette, Playfair Display serif headings, warm linen background (`#F8F4EE`) for package sections, clean generous whitespace.
