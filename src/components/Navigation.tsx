"use client";

import * as React from "react";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          aria-label="MFD Creative Staging home"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-sm bg-black">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`font-bold text-lg leading-none tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              MFD
            </span>
            <span
              className={`text-[10px] uppercase tracking-widest font-light transition-colors duration-300 ${
                isScrolled ? "text-black/60" : "text-white/70"
              }`}
            >
              Creative Staging
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:opacity-70 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Button
            className={`rounded-full px-5 font-medium transition-all duration-300 ${
              isScrolled
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
                className={`md:hidden p-2 rounded-md transition-colors ${
                  isScrolled
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
                    <a
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
            <div className="px-6 mt-auto pb-8 border-t border-border pt-6">
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
