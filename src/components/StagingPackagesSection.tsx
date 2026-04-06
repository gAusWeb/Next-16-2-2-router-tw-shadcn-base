"use client";

import * as React from "react";
import Link from "next/link";
import StagingPackagesCard from "@/components/StagingPackagesCard";

const packages = [
  {
    image: "https://picsum.photos/seed/staging-essential/800/450",
    title: "Essential",
    description:
      "Perfect for smaller properties or investors looking for a clean, buyer-ready presentation on a focused budget.",
    features: [
      "Up to 3 rooms staged",
      "Curated furniture selection",
      "Soft furnishings & accessories",
      "2-week rental period",
      "Professional setup & pack-down",
    ],
    priceFrom: "$1,800",
    ctaLabel: "Get Started",
    featured: false,
  },
  {
    image: "https://picsum.photos/seed/staging-signature/800/450",
    title: "Signature",
    description:
      "Our most sought-after package — a complete whole-home transformation designed to maximise buyer appeal and sale price.",
    features: [
      "Full home staging (all rooms)",
      "Premium designer furniture",
      "Artwork, rugs & décor styling",
      "4-week rental period",
      "Professional photography prep",
      "Dedicated staging consultant",
    ],
    priceFrom: "$3,900",
    ctaLabel: "Book Now",
    featured: true,
  },
  {
    image: "https://picsum.photos/seed/staging-luxury/800/450",
    title: "Luxury",
    description:
      "An elevated experience for prestige properties — bespoke luxury pieces, extended support, and white-glove service throughout.",
    features: [
      "Full home staging (all rooms)",
      "Bespoke luxury furniture pieces",
      "Custom artwork & feature styling",
      "6-week rental period",
      "Agent liaison & open home support",
      "Priority scheduling",
    ],
    priceFrom: "$6,500",
    ctaLabel: "Enquire Now",
    featured: false,
  },
];

export default function StagingPackagesSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [headerVisible, setHeaderVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
          if (entry.target === headerRef.current && entry.isIntersecting) {
            setHeaderVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (headerRef.current) observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="relative bg-[#F8F4EE] py-28 px-6 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0px)" : "translateY(24px)",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/50 font-semibold mb-3">
            Staging Packages
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-black leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Choose Your Package
          </h2>
          <p className="mt-4 text-sm text-black/60 max-w-lg mx-auto leading-relaxed">
            Every package includes our signature design process, premium
            furniture, and full installation. Choose the level of transformation
            that suits your property and goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-stretch">
          {packages.map((pkg, i) => (
            <StagingPackagesCard
              key={pkg.title}
              {...pkg}
              isVisible={isVisible}
              animationDelay={i * 120}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="text-center mt-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0px)" : "translateY(16px)",
            transitionDelay: "500ms",
          }}
        >
          <p className="text-xs text-black/30 leading-relaxed">
            All prices are indicative. Final pricing is based on property size
            and scope.{" "}
            <Link
              href="#contact"
              className="text-black/55 hover:text-black underline underline-offset-4 transition-colors"
            >
              Contact us for a custom quote.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
