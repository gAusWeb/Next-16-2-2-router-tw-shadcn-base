<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# MFD Creative Staging — Project Reference

## Project

Real estate home staging company website. Service: staging vacant/empty homes with furniture and décor to make them more appealing for sale. Modern luxury aesthetic.

## Tech Stack

- **Next.js 16.2.2** — App Router, TypeScript, `src/` directory layout
- **React 19.2.4**
- **Tailwind CSS v4** — CSS variables only, **no `tailwind.config.ts`** exists. All theme tokens live in `src/app/globals.css` under `@theme inline {}`.
- **shadcn/ui `base-nova` style** — uses **`@base-ui/react`**, NOT `@radix-ui/react`. This is critical — do not import from radix.
- **lucide-react** for all icons
- **embla-carousel-react** installed (dep of shadcn carousel component)

## Fonts

Declared in `src/app/layout.tsx` via `next/font/google`:

- `Playfair_Display` → CSS var `--font-playfair` (headings/brand)
- `Inter` → CSS var `--font-inter` (body, mapped to `--font-sans`)

**Usage pattern for headings:** `style={{ fontFamily: 'var(--font-playfair)' }}` — Tailwind does not auto-apply heading font; use inline style or a wrapper class.

Registered in `src/app/globals.css` `@theme inline {}`:

```css
--font-sans: var(--font-inter);
--font-heading: var(--font-playfair);
--font-playfair: var(--font-playfair);
```

## File Structure

```
src/
  app/
    globals.css       # Tailwind v4 config (all CSS vars + @theme inline)
    layout.tsx        # Root layout — fonts, metadata
    page.tsx          # Home page — composes all sections
  components/
    HeroSlideshow.tsx # "use client" — custom cross-fade slideshow, 5 slides
    Navigation.tsx    # "use client" — fixed nav, scroll-aware, mobile Sheet sidebar
    ServicesSection.tsx # Server component — 3 shadcn Cards
    WhyUsSection.tsx  # Server component — split image/text layout
    ui/               # shadcn generated components (do not hand-edit)
      button.tsx
      card.tsx
      carousel.tsx    # embla-based (sliding, not fade)
      dialog.tsx
      input.tsx
      sheet.tsx
  lib/
    utils.ts          # cn() helper (clsx + tailwind-merge)
next.config.ts        # turbopack root fix + picsum remotePatterns
components.json       # shadcn config — style:base-nova, baseColor:neutral
```

## shadcn Components

Installed: `button`, `card`, `carousel`, `dialog`, `input`, `sheet`

**To add more:** `npx shadcn@latest add <component-name> --yes`

**shadcn base-nova API patterns:**

- Components use `data-slot` attributes, not `asChild`
- Use `render={<element />}` prop on primitives to change the underlying element
- `SheetTrigger render={<button />}` / `SheetClose render={<a />}` etc.
- Sheet `side` prop: `"left" | "right" | "top" | "bottom"`

## Images

`next/image` is used everywhere. External images require `remotePatterns` in `next.config.ts`.
Currently whitelisted: `picsum.photos`, `fastly.picsum.photos`.
To add production image domains, append to the `remotePatterns` array.

**Picsum pattern for dev placeholders:**

```
https://picsum.photos/seed/<seed-word>/<width>/<height>
```

Use descriptive seeds for consistent real-estate images (e.g. `house1`, `interior1`, `stagingroom`).

## Key Conventions

- **`"use client"`** only on components that need interactivity (scroll listeners, state, event handlers). Server components are the default.
- **Container pattern:** `max-w-7xl mx-auto px-6` for section content width
- **Section IDs:** `#services`, `#portfolio`, `#about`, `#contact` — used by nav links
- **Button styling:** rounded-full for CTAs, standard rounded-lg for utility buttons
- **Colour palette:** black/white/neutral — no colour accents. Opacity variants (`black/5`, `white/70`) for subtle tones.
- **Tailwind v4 note:** Use `bg-black/10` not `bg-opacity-10`. Use `text-black/50` not `text-opacity-50`.

## Navigation Behaviour

- Fixed position, `z-50`, overlays the hero
- Transparent when `scrollY < 80px`, `bg-white/95 backdrop-blur-sm` after
- Mobile breakpoint: `md:hidden` hides desktop nav; hamburger shows Sheet sidebar
- Nav links: Home `#`, Services `#services`, Portfolio `#portfolio`, About `#about`, Contact `#contact`

## HeroSlideshow Behaviour

- 5 slides, `h-screen`, full-width
- Cross-fade via CSS `transition-opacity duration-1000` (NOT embla — embla slides, not fades)
- Auto-advances every 5000ms using `setInterval`
- Pauses on `onMouseEnter`, resumes on `onMouseLeave`
- Navigation dots at `bottom-8 left-1/2`; clicking a dot resets the timer

## What Does Not Exist Yet

- Portfolio page/section (id `#portfolio` is a placeholder anchor)
- Contact form
- About page/section
- CMS or data layer
- Authentication
- Dark mode (shadcn dark vars defined in globals.css but no toggle implemented)
