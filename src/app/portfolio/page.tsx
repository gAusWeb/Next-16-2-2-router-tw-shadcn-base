import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PortfolioSection from "@/components/PortfolioSection";
import ContactInfo from "@/components/ContactInfo";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our recent staging projects across Melbourne — see how MFD Creative Staging transforms properties and achieves exceptional results.",
  openGraph: {
    title: "Portfolio — MFD Creative Staging",
    description:
      "Browse recent staging projects across Melbourne. From Toorak residences to South Yarra apartments — see how thoughtful design transforms properties and achieves exceptional sale results.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    title: "Portfolio — MFD Creative Staging",
    description:
      "Browse recent staging projects across Melbourne. See how thoughtful design transforms properties and achieves exceptional sale results.",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navigation initialTheme="light" />
      <main className="flex flex-col pt-20">
        <PortfolioSection />
      </main>
      <footer className="bg-black text-white pt-14 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            {/* Brand */}
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

            {/* Nav links */}
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

            {/* Contact */}
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
