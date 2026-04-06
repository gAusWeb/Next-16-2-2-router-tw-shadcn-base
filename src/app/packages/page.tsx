import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import PackagesQuickNav from "@/components/PackagesQuickNav";
import ContactInfo from "@/components/ContactInfo";
import SocialLinks from "@/components/SocialLinks";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Staging Packages",
  description:
    "Explore our Essential, Signature, and Luxury staging packages. Full pricing, inclusions, and everything you need to choose the right package for your property.",
  openGraph: {
    title: "Staging Packages — MFD Creative Staging",
    description:
      "Choose from our Essential, Signature, or Luxury staging packages. Every package includes premium furniture, delivery, installation, and removal. Serving Melbourne vendors.",
    url: "/packages",
    type: "website",
  },
  twitter: {
    title: "Staging Packages — MFD Creative Staging",
    description:
      "Choose from Essential, Signature, or Luxury staging. Every package includes premium furniture, delivery, installation, and removal.",
  },
};

const packages = [
  {
    id: "essential",
    index: "01",
    image: "https://picsum.photos/seed/staging-essential/1200/800",
    title: "Essential",
    tagline: "Buyer-ready on a focused budget.",
    description:
      "Perfect for smaller properties or investors looking for a clean, impactful presentation without overspending. We stage the rooms that matter most and leave buyers with a lasting first impression.",
    features: [
      "Up to 3 rooms staged",
      "Curated furniture selection",
      "Soft furnishings & accessories",
      "2-week rental period",
      "Professional setup & pack-down",
    ],
    details: [
      "Initial 30-minute phone consultation",
      "Living room, master bedroom & one additional room",
      "Furniture sourced from our in-house collection",
      "Neutral, market-ready styling brief",
      "Delivery, installation & removal included",
      "Available for properties up to approx. 150m²",
      "Extension available at weekly rate",
    ],
    priceFrom: "$1,800",
    featured: false,
  },
  {
    id: "signature",
    index: "02",
    image: "https://picsum.photos/seed/staging-signature/1200/800",
    title: "Signature",
    tagline: "Whole-home transformation. Maximum buyer appeal.",
    description:
      "Our most sought-after package — a comprehensive staging solution that covers every room and every detail. Designed to maximise emotional connection with buyers and achieve the strongest possible sale price.",
    features: [
      "Full home staging (all rooms)",
      "Premium designer furniture",
      "Artwork, rugs & décor styling",
      "4-week rental period",
      "Professional photography prep",
      "Dedicated staging consultant",
    ],
    details: [
      "In-person consultation & property walkthrough",
      "All living areas, bedrooms & key spaces staged",
      "Premium designer furniture & accessories",
      "Curated artwork, rugs, cushions & greenery",
      "Styled to your target buyer demographic",
      "Photography-ready presentation walk-through",
      "Agent briefing pack included",
      "Available for properties up to approx. 300m²",
      "Priority scheduling available",
      "Extension available at weekly rate",
    ],
    priceFrom: "$3,900",
    featured: true,
  },
  {
    id: "luxury",
    index: "03",
    image: "https://picsum.photos/seed/staging-luxury/1200/800",
    title: "Luxury",
    tagline: "White-glove service for prestige properties.",
    description:
      "An elevated, bespoke experience reserved for prestige properties. Every detail — from custom artwork to fragrance — is considered. Our senior consultants work closely with your agent to ensure the property presents at its absolute best.",
    features: [
      "Full home staging (all rooms)",
      "Bespoke luxury furniture pieces",
      "Custom artwork & feature styling",
      "6-week rental period",
      "Agent liaison & open home support",
      "Priority scheduling",
    ],
    details: [
      "Dedicated senior staging consultant",
      "All rooms including alfresco & outdoor spaces",
      "Bespoke and premium hire furniture",
      "Custom artwork sourcing & framing",
      "Feature lighting, florals & fragrance styling",
      "Coordinated with photographer & agent",
      "Open home attendance available on request",
      "Suitable for prestige properties 300m²+",
      "White-glove delivery and pack-down",
      "Priority emergency scheduling",
      "6-week rental period with extended options",
    ],
    priceFrom: "$6,500",
    featured: false,
  },
];

export default function PackagesPage() {
  return (
    <>
      <Navigation initialTheme="light" />
      <main className="flex flex-col pt-20">
        {/* ── Page header ── */}
        <section className="pt-20 pb-16 px-6 bg-white border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-medium text-neutral-400 mb-3">
              Staging Packages
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-black mb-5 max-w-2xl leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Find the Right Package for Your Property
            </h1>
            <p className="text-neutral-500 max-w-xl text-base leading-relaxed mb-8">
              Every package includes our signature design process, premium
              furniture, delivery, installation, and removal. Choose the level
              of transformation that suits your property and goals.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                className="rounded-full bg-black text-white hover:bg-black/80 px-6 font-medium"
                render={<Link href="/#contact" />}
              >
                Get a Custom Quote <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* ── Quick-jump package nav ── */}
        <PackagesQuickNav
          items={packages.map(({ id, index, title, featured }) => ({
            id,
            index,
            title,
            featured,
          }))}
        />

        {/* ── Per-package sections ── */}
        {packages.map((pkg, i) => {
          const imageRight = i % 2 === 0;
          const isFeatured = pkg.featured;
          return (
            <section
              key={pkg.id}
              id={pkg.id}
              className={
                isFeatured
                  ? "scroll-mt-32 bg-[#F8F4EE] py-12 md:py-24 px-6"
                  : "scroll-mt-32 bg-white py-12 md:py-24 px-6 border-b border-black/5"
              }
            >
              <div className="max-w-7xl mx-auto">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center ${
                    imageRight ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Mobile-only header — shown above image on small screens */}
                  <div className="lg:hidden">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/30 mb-2">
                      {pkg.index} — Package
                    </p>
                    <h2
                      className="text-4xl font-bold text-black leading-none mb-3"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {pkg.title}
                    </h2>
                    <p className="text-base text-black/50 italic">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 w-full">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} staging package`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {isFeatured && (
                      <div className="absolute top-5 left-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Most Popular
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-8">
                    {/* Header — desktop only (mobile version rendered above image) */}
                    <div className="hidden lg:block">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/30 mb-2">
                        {pkg.index} — Package
                      </p>
                      <h2
                        className="text-4xl md:text-5xl font-bold text-black leading-none mb-3"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {pkg.title}
                      </h2>
                      <p className="text-base text-black/50 italic">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-black/60 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Features */}
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-black/30 mb-3">
                        Highlights
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <span className="mt-0.5 shrink-0 w-4.5 h-4.5 rounded-full bg-black flex items-center justify-center">
                              <Check
                                className="w-2.5 h-2.5 text-white"
                                strokeWidth={3}
                              />
                            </span>
                            <span className="text-sm text-black/65 leading-snug">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Full details */}
                    <div className="pt-6 border-t border-black/8">
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-black/30 mb-3">
                        What&apos;s Included
                      </p>
                      <ul className="flex flex-col gap-2">
                        {pkg.details.map((d) => (
                          <li key={d} className="flex items-start gap-2.5">
                            <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-black/30" />
                            <span className="text-sm text-black/50 leading-relaxed">
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] font-medium text-black/30 mb-0.5">
                          Starting from
                        </p>
                        <p
                          className="text-4xl font-bold text-black leading-none"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {pkg.priceFrom}
                        </p>
                      </div>
                      <Button
                        nativeButton={false}
                        className={`rounded-full font-semibold px-6 h-12 ${
                          isFeatured
                            ? "bg-black text-white hover:bg-black/80"
                            : "bg-black/8 text-black border border-black/12 hover:bg-black/14"
                        }`}
                        render={<Link href="/#contact" />}
                      >
                        Enquire About {pkg.title}{" "}
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── What's always included ── */}
        <section className="py-20 px-6 bg-white border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest font-medium text-neutral-400 mb-3">
                  Every Package
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-black mb-5"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Always Included, No Matter the Package
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                  Regardless of which package you choose, every MFD Creative
                  Staging project begins and ends with the same commitment to
                  quality and care.
                </p>
                <ul className="flex flex-col gap-4">
                  {[
                    "Professional delivery, installation & removal",
                    "Insurance on all hire furniture",
                    "Access to our full furniture & décor inventory",
                    "Dedicated point of contact throughout",
                    "Post-staging walkthrough & styling notes",
                    "Flexible rental extension options",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-black/65 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-8 border border-black/5">
                <p className="text-xs uppercase tracking-widest font-medium text-neutral-400 mb-2">
                  Not sure which package?
                </p>
                <h3
                  className="text-2xl font-bold text-black mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  We&apos;ll help you decide.
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                  Every property is different. Send us a message or call us
                  directly and we&apos;ll recommend the right package based on
                  your property size, timeline, and goals.
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    nativeButton={false}
                    className="rounded-full bg-black text-white hover:bg-black/80 font-medium w-full justify-center"
                    render={<Link href="/#contact" />}
                  >
                    Send Us a Message <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <ContactInfo
                    showEmail={false}
                    layout="horizontal"
                    textClassName="text-black/60 text-sm"
                    iconClassName="text-black/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Full-width CTA banner ── */}
        <section className="bg-black py-20 px-6 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-medium text-white/40 mb-4">
              Ready to Get Started?
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let&apos;s Stage Your Property
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Contact us today for a no-obligation quote. We&apos;ll assess your
              property, recommend the best package, and get you ready for a
              faster, higher-value sale.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                nativeButton={false}
                className="rounded-full bg-white text-black hover:bg-white/90 px-8 font-semibold h-12"
                render={<Link href="/#contact" />}
              >
                Request a Quote <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 font-medium h-12"
                render={<Link href="tel:" />}
              >
                <Phone className="w-4 h-4 mr-1.5" /> Call Us Directly
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-black text-white pt-14 pb-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div className="flex flex-col gap-3">
              <span
                className="font-bold text-xl text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                MFD Creative Staging
              </span>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                Premium home staging that creates emotional connections, sells
                faster, and achieves higher prices.
              </p>
              <SocialLinks
                className="mt-1"
                colorClassName="text-white/50"
                iconSize="w-5 h-5"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest font-medium text-white/30">
                Navigation
              </p>
              <nav
                className="flex flex-col gap-2"
                aria-label="Footer navigation"
              >
                {[
                  { label: "Home", href: "/" },
                  { label: "Packages", href: "/packages" },
                  { label: "Portfolio", href: "/portfolio" },
                  { label: "About", href: "/#about" },
                  { label: "Contact", href: "/#contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors w-fit"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest font-medium text-white/30">
                Get in Touch
              </p>
              <ContactInfo
                layout="vertical"
                textClassName="text-white/60"
                iconClassName="text-white/40"
              />
              <Link
                href="/#contact"
                className="mt-2 text-sm font-medium text-white/80 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-all w-fit"
              >
                Request a staging quote &rarr;
              </Link>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} MFD Creative Staging. All rights
              reserved.
            </p>
            <p className="text-xs text-white/20">
              Built with care in Melbourne, Australia
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
