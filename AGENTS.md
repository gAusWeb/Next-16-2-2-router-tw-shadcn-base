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
- **lucide-react** for general UI icons (does NOT include social media icons)
- **react-icons** (installed) — use `react-icons/ri` for social icons: `RiInstagramLine`, `RiLinkedinBoxLine`, `RiFacebookBoxLine`
- **embla-carousel-react** installed (dep of shadcn carousel component, not used for HeroSlideshow)

## Fonts

Declared in `src/app/layout.tsx` via `next/font/google`:

- `Playfair_Display` → CSS var `--font-playfair` (headings/brand)
- `Inter` → CSS var `--font-inter` (body, mapped to `--font-sans`)

**Usage pattern for headings:** `style={{ fontFamily: 'var(--font-playfair)' }}` — Tailwind does not auto-apply heading font; use inline style.

Registered in `src/app/globals.css` `@theme inline {}`:

```css
--font-sans: var(--font-inter);
--font-heading: var(--font-playfair);
--font-playfair: var(--font-playfair);
```

## Design Tokens (globals.css)

```css
--color-warm-linen: #f8f4ee; /* section background for StagingPackagesSection */
--color-warm-mink: #2a2320; /* dark warm accent (currently unused in UI) */
```

## File Structure

```
src/
  app/
    globals.css             # Tailwind v4 config (all CSS vars + @theme inline)
    layout.tsx              # Root layout — fonts, metadata
    page.tsx                # Home page — composes all sections + footer
    portfolio/
      page.tsx              # /portfolio route — Navigation (light) + PortfolioSection + footer
  components/
    HeroSlideshow.tsx       # "use client" — custom cross-fade slideshow
    Navigation.tsx          # "use client" — fixed nav, scroll-aware, mobile Sheet sidebar
    PortfolioSection.tsx    # "use client" — project grid + lightbox carousel
    ServicesSection.tsx     # Server component — 3 shadcn Cards
    WhyUsSection.tsx        # Server component — split image/text layout
    StagingPackagesSection.tsx  # "use client" — scroll-animated pricing section
    StagingPackagesCard.tsx     # "use client" — individual pricing card (featured/standard)
    ContactInfo.tsx         # "use client" — anti-spam phone/email (assembled in useEffect)
    SocialLinks.tsx         # Server component — Instagram, LinkedIn, Facebook icon links
    ui/                     # shadcn generated components — do NOT hand-edit
      button.tsx
      card.tsx
      carousel.tsx
      dialog.tsx
      input.tsx
      sheet.tsx
  lib/
    utils.ts                # cn() helper (clsx + tailwind-merge)
next.config.ts              # turbopack root fix + picsum remotePatterns
components.json             # shadcn config — style:base-nova, baseColor:neutral
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
- **Section IDs:** `#services`, `#about`, `#contact`, `#packages` — used by nav links on the home page
- **Routes:** `/` home, `/portfolio` standalone portfolio page
- **Button styling:** `rounded-full` for CTAs, `rounded-lg` for utility buttons
- **Colour palette:** black/white/neutral — no colour accents. Opacity variants (`black/5`, `white/70`) for subtle tones.
- **Tailwind v4 note:** Use `bg-black/10` not `bg-opacity-10`. Use `text-black/50` not `text-opacity-50`.

---

## Component Details

### Navigation (`Navigation.tsx`)

- `"use client"`, fixed position, `z-50`, overlays the hero
- Props: `initialTheme?: "light" | "dark"` (default `"dark"`)
  - `"dark"`: starts with white text on transparent background (for pages with a full-screen dark hero behind nav)
  - `"light"`: starts with black text on transparent background (for pages with no hero, e.g. `/portfolio`)
- Internal `useDarkText = isScrolled || initialTheme === "light"` drives all colour-conditional classes
- Scroll threshold `80px` → `bg-white/95 backdrop-blur-sm shadow-sm`; text always goes dark once scrolled
- **Desktop right side:** social icons → divider → phone number (ContactInfo `showEmail={false}`) → "Get a Quote" button
- **Mobile:** hamburger → Sheet `side="left"` → nav links → phone + email (ContactInfo) + social icons + "Get a Free Quote" button
- Nav links: Home `/`, Services `/#services`, Portfolio `/portfolio`, About `/#about`, Contact `/#contact`
- Imports: `ContactInfo`, `SocialLinks`, lucide `Menu/X/Home`, shadcn `Button/Sheet/SheetTrigger/SheetContent/SheetClose`

### HeroSlideshow (`HeroSlideshow.tsx`)

- `"use client"`, 5 slides, `h-screen`, full-width
- Cross-fade via CSS `transition-opacity duration-1000` (NOT embla — embla slides, this fades)
- Auto-advances every 5000ms via `setInterval`; interval pauses only while dragging (`isDragging`)
- Dot navigation at `bottom-8 left-1/2`; prev/next arrow buttons (`hidden md:flex`)
- Drag/swipe via `onPointerDown/Up/Cancel` with `setPointerCapture`; `DRAG_THRESHOLD = 50px`
- **Bug fix in place:** `handlePointerDown` skips if `e.target.closest('button, a')` — required to keep button clicks working

### ServicesSection (`ServicesSection.tsx`)

- Server component, `id="services"`
- 3 shadcn `Card` components in a responsive grid
- lucide icons: `Home`, `ClipboardList`, `Sofa`
- White background, hover lift animation

### WhyUsSection (`WhyUsSection.tsx`)

- Server component, split layout: picsum image left + reasons right
- Floating stat card: "500+ Homes Staged"
- lucide `Check` icons for checklist, two CTA buttons

### StagingPackagesSection (`StagingPackagesSection.tsx`)

- `"use client"`, `id="packages"`, `bg-[#F8F4EE]` (warm linen)
- `IntersectionObserver` drives `headerVisible` + `isVisible` states
- Cards stagger at 120ms intervals via `animationDelay` prop passed to each `StagingPackagesCard`
- Radial gradient texture overlay (`rgba(0,0,0,0.03)`)
- 3 packages: Essential / Signature (featured) / Luxury

### StagingPackagesCard (`StagingPackagesCard.tsx`)

- `"use client"`, accepts `isVisible` + `animationDelay` for parent-controlled entry animation
- Featured card: `bg-white shadow-2xl md:-my-8` (pops out vertically)
- Non-featured: `bg-white shadow-md ring-1 ring-black/5`
- "Most Popular" badge on featured only (`top-5 right-5`)
- CTA: featured = `bg-black text-white`; non-featured = `bg-black/8 text-black border border-black/12`

### ContactInfo (`ContactInfo.tsx`)

- `"use client"` — **anti-spam**: email/phone assembled in `useEffect` from split arrays; never present in static HTML/SSR
- Props: `layout` (`"horizontal"` | `"vertical"`), `showEmail`, `showPhone`, `textClassName`, `iconClassName`, `className`
- Default values to update for production: email `info@mfdcreativestaging.com.au`, phone `+61 400 000 000`
- Icons: lucide `Phone` + `Mail`

### SocialLinks (`SocialLinks.tsx`)

- Server component (no state needed)
- Props: `className`, `iconSize` (default `"w-[18px] h-[18px]"`), `colorClassName`
- Icons: `RiInstagramLine`, `RiLinkedinBoxLine`, `RiFacebookBoxLine` from `react-icons/ri`
- All links open `target="_blank" rel="noopener noreferrer"`
- URLs to update for production: stored in `socials` array at top of file

### PortfolioSection (`PortfolioSection.tsx`)

- `"use client"`, used on the `/portfolio` route; NOT on the homepage
- Data: `PROJECTS` array at top of file — each entry: `{ id, name, location, images: [{ src, alt }] }`
  - Currently 4 placeholder projects (Toorak, South Yarra, Brighton, Camberwell), 4–6 images each using picsum seeds
  - **To swap in real images:** replace `src` strings in `PROJECTS`; add new domains to `next.config.ts` `remotePatterns` if not picsum
- **Grid:** responsive thumbnail grid per project — `2 cols → 3 cols (sm) → 4 cols (lg) → 6 cols (xl)`
- **Lightbox:** full-screen `Dialog` (black, `w-screen h-screen`, rounded-none) containing an embla `Carousel`
  - Opens on thumbnail click, jumps directly to clicked image via embla `opts.startIndex`
  - Top bar: project name + `current / total` counter + close button
  - Bottom thumbnail strip: click to jump to slide; active thumb highlighted with white ring
  - Prev/Next arrows positioned `left-4` / `right-4` (inside modal, not negative offset)
  - `loop: true` on carousel
  - Dialog unmounts carousel on close (200ms delay) so embla reinitialises fresh on next open
- Imports: `Dialog/DialogContent/DialogClose`, `Carousel/CarouselContent/CarouselItem/CarouselPrevious/CarouselNext/CarouselApi`, `next/image`, lucide `XIcon`

### Footer (inline in `page.tsx` and `portfolio/page.tsx`)

- 3-column grid: brand + tagline + social icons | nav links | contact info + quote CTA
- Bottom row: copyright left, "Built with care in Melbourne" right
- Uses `ContactInfo` (layout="vertical") and `SocialLinks` (white/50 color)
- Nav links in footer use full routes: `/`, `/#services`, `/portfolio`, `/#about`, `/#contact`
- **Note:** footer is duplicated inline in both page files — if updating footer design, edit both `src/app/page.tsx` and `src/app/portfolio/page.tsx`

---

## Page Composition

### Home (`src/app/page.tsx`)

```
<Navigation />                  ← fixed, overlays hero (default initialTheme="dark")
<main>
  <HeroSlideshow />             ← full-screen, h-screen
  <ServicesSection />           ← id="services"
  <StagingPackagesSection />    ← id="packages", warm linen bg
  <WhyUsSection />
</main>
<footer>…</footer>
```

### Portfolio (`src/app/portfolio/page.tsx`)

```
<Navigation initialTheme="light" />  ← black text on transparent (no dark hero)
<main className="pt-18">
  <PortfolioSection />               ← id="portfolio", project grid + lightbox
</main>
<footer>…</footer>
```

<footer>               ← bg-black, 3-col layout
```

---

## What Does Not Exist Yet

- Portfolio section/page (`#portfolio` is a placeholder anchor)
- Contact form (`#contact` is a placeholder anchor)
- About section/page (`#about` is a placeholder anchor)
- CMS or data layer (all content is hardcoded)
- Authentication
- Dark mode (CSS vars defined but no toggle implemented)
- Production images (all using picsum.photos placeholders)
