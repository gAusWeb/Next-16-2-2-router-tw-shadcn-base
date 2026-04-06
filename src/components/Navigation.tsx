"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import ContactInfo from "@/components/ContactInfo";
import SocialLinks from "@/components/SocialLinks";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navigation({
  initialTheme = "dark",
}: {
  initialTheme?: "light" | "dark";
}) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hideOnMobile, setHideOnMobile] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);

  // Show dark (black) text when scrolled OR when the page has no dark hero behind the nav
  const useDarkText = isScrolled || initialTheme === "light";

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 80);
      if (currentY > 80) {
        setHideOnMobile(currentY > lastScrollY.current);
      } else {
        setHideOnMobile(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${
        hideOnMobile ? "z-30" : "z-50"
      } ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-black/5"
          : "bg-transparent"
      } ${hideOnMobile ? "-translate-y-full lg:translate-y-0" : "translate-y-0"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="MFD Creative Staging home"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-sm bg-black">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`font-bold text-lg leading-none tracking-tight transition-colors duration-300 ${
                useDarkText ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              MFD
            </span>
            <span
              className={`text-[10px] uppercase tracking-widest font-light transition-colors duration-300 ${
                useDarkText ? "text-black/60" : "text-white/70"
              }`}
            >
              Creative Staging
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:opacity-70 ${
                useDarkText ? "text-black" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right: social + phone + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <SocialLinks
            colorClassName={useDarkText ? "text-black/60" : "text-white/80"}
            iconSize="w-[17px] h-[17px]"
          />
          <div
            className={`h-4 w-px transition-colors duration-300 ${
              useDarkText ? "bg-black/15" : "bg-white/30"
            }`}
            aria-hidden="true"
          />
          <ContactInfo
            showEmail={false}
            textClassName={useDarkText ? "text-black/70" : "text-white/80"}
            iconClassName={useDarkText ? "text-black/50" : "text-white/60"}
          />
          <Button
            className={`rounded-full px-5 font-medium transition-all duration-300 ${
              useDarkText
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            Get a Quote
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <button
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  useDarkText
                    ? "text-black hover:bg-black/5"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>

          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-72 px-0 py-0"
          >
            {/* Mobile sheet header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-black">
                  <Home className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex flex-col leading-none">
                  <span
                    className="font-bold text-base leading-none tracking-tight text-black"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    MFD
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-light text-black/50">
                    Creative Staging
                  </span>
                </div>
              </div>
              <SheetClose
                render={
                  <button
                    className="p-1.5 rounded-md text-black/50 hover:text-black hover:bg-black/5 transition-colors"
                    aria-label="Close menu"
                  />
                }
              >
                <X className="w-4 h-4" />
              </SheetClose>
            </div>

            {/* Mobile Nav Links */}
            <nav
              className="flex flex-col px-4 py-6 gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <SheetClose
                  key={link.label}
                  render={
                    <Link
                      href={link.href}
                      className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-black/80 hover:text-black hover:bg-black/5 transition-colors"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 mt-auto pb-8 border-t border-border pt-6 flex flex-col gap-4">
              {/* Contact info */}
              <ContactInfo
                layout="vertical"
                textClassName="text-black/70"
                iconClassName="text-black/50"
              />
              {/* Social links */}
              <SocialLinks colorClassName="text-black/60" />
              <Button className="w-full rounded-full bg-black text-white hover:bg-black/80 font-medium">
                Get a Free Quote
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
