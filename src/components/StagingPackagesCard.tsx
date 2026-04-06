"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type StagingPackagesCardProps = {
  image: string;
  title: string;
  description: string;
  features: string[];
  fullDetails?: string[];
  priceFrom: string;
  ctaLabel: string;
  ctaHref?: string;
  featured?: boolean;
  isVisible?: boolean;
  animationDelay?: number;
};

export default function StagingPackagesCard({
  image,
  title,
  description,
  features,
  fullDetails,
  priceFrom,
  ctaLabel,
  ctaHref = "/#contact",
  featured = false,
  isVisible = false,
  animationDelay = 0,
}: StagingPackagesCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-700 ease-out",
        featured
          ? "bg-white text-black shadow-2xl shadow-black/20 ring-1 ring-black/5 md:-my-8"
          : "bg-white text-black shadow-md shadow-black/10 ring-1 ring-black/5",
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(48px)",
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      {/* Most Popular badge */}
      {featured && (
        <div className="absolute top-5 right-5 z-10 bg-black text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
          Most Popular
        </div>
      )}

      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {featured && (
          <div className="absolute inset-0 pointer-events-none bg-black/10" />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-7 gap-6">
        {/* Title + description */}
        <div>
          <h3
            className={cn(
              "text-2xl font-bold mb-2 leading-snug",
              featured ? "text-black" : "text-black/80",
            )}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed",
              featured ? "text-black/50" : "text-black/45",
            )}
          >
            {description}
          </p>
        </div>

        {/* Features list */}
        <ul className="flex flex-col gap-2.5 flex-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center",
                  featured ? "bg-black" : "bg-black/15",
                )}
              >
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </span>
              <span
                className={cn(
                  "text-sm leading-snug",
                  featured ? "text-black/60" : "text-black/55",
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Full details — only rendered when passed (e.g. /packages page) */}
        {fullDetails && fullDetails.length > 0 && (
          <div
            className={cn(
              "pt-5 border-t",
              featured ? "border-black/8" : "border-black/10",
            )}
          >
            <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/30 mb-3">
              What&apos;s Included
            </p>
            <ul className="flex flex-col gap-2">
              {fullDetails.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-black/25" />
                  <span className="text-sm text-black/50 leading-snug">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price */}
        <div
          className={cn(
            "pt-5 border-t",
            featured ? "border-black/8" : "border-black/10",
          )}
        >
          <p
            className={cn(
              "text-[10px] uppercase tracking-[0.15em] font-medium mb-1",
              featured ? "text-black/30" : "text-black/30",
            )}
          >
            Starting from
          </p>
          <p
            className={cn(
              "text-4xl font-bold leading-none tracking-tight",
              featured ? "text-black" : "text-black",
            )}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {priceFrom}
          </p>
        </div>

        {/* CTA */}
        <Button
          size="lg"
          className={cn(
            "w-full rounded-full font-semibold text-sm h-12 mt-1 transition-all duration-200",
            featured
              ? "bg-black text-white hover:bg-black/80"
              : "bg-black/8 text-black border border-black/12 hover:bg-black/14 hover:border-black/20",
          )}
          nativeButton={false}
          render={<Link href={ctaHref} />}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
