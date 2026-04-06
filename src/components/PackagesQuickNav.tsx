"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

interface PackageNavItem {
  id: string;
  index: string;
  title: string;
  featured: boolean;
}

export default function PackagesQuickNav({
  items,
}: {
  items: PackageNavItem[];
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const headerVisibleRef = useRef(true);
  const headerHeightRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Measure the actual rendered header height.
  useEffect(() => {
    const measure = () => {
      const h = document.querySelector("header")?.offsetHeight ?? 0;
      headerHeightRef.current = h;
      setHeaderHeight(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    const headerEl = document.querySelector("header");
    if (headerEl) ro.observe(headerEl);
    return () => ro.disconnect();
  }, []);

  // Determine which section is active based on scroll position.
  const updateActiveId = () => {
    const navHeight = navRef.current?.offsetHeight ?? 60;
    const headerH = headerVisibleRef.current ? headerHeightRef.current : 0;
    const offset = headerH + navHeight + 8;

    let current = items[0]?.id ?? "";
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= offset) {
        current = id;
      }
    }
    setActiveId(current);
  };

  // Combined scroll handler: header visibility + active section (throttled via rAF).
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const visible = isDesktop || y <= 80 || y < lastScrollY.current;
      headerVisibleRef.current = visible;
      setHeaderVisible(visible);
      lastScrollY.current = y;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveId(); // set correct active on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Recalculate active section on resize.
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateActiveId, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const activeItem = items.find((p) => p.id === activeId) ?? items[0];
  const stickyTop = headerVisible ? headerHeight : 0;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = navRef.current?.offsetHeight ?? 60;
    const headerH = headerVisibleRef.current ? headerHeightRef.current : 0;
    const top =
      el.getBoundingClientRect().top + window.scrollY - headerH - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setActiveId(id);
    scrollToId(id);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <div
      ref={navRef}
      style={{ top: stickyTop, transition: "top 300ms ease-in-out" }}
      className="sticky z-40 bg-white/95 backdrop-blur-sm border-b border-black/8 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Mobile dropdown ── */}
        <div className="lg:hidden py-3 relative">
          <div className="flex items-center gap-2 text-sm font-medium text-black pointer-events-none absolute inset-y-0 left-0 pl-0 py-3">
            <span className="text-[10px] font-semibold text-black/30 tabular-nums">
              {activeItem?.index}
            </span>
            <span>{activeItem?.title}</span>
            {activeItem?.featured && (
              <span className="text-[9px] font-bold uppercase tracking-widest bg-black text-white px-1.5 py-0.5 rounded-full">
                Popular
              </span>
            )}
            <ChevronDownIcon className="w-3.5 h-3.5 text-black/40 ml-0.5" />
          </div>
          <select
            value={activeId}
            onChange={handleDropdownChange}
            className="w-full h-10 opacity-0 cursor-pointer"
            aria-label="Jump to package"
          >
            {items.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.index} — {pkg.title}
                {pkg.featured ? " (Most Popular)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* ── Desktop pill links ── */}
        <div className="hidden lg:flex items-center gap-8">
          {items.map((pkg) => {
            const isActive = activeId === pkg.id;
            return (
              <Link
                key={pkg.id}
                href={`#${pkg.id}`}
                onClick={(e) => handleLinkClick(e, pkg.id)}
                className={[
                  "shrink-0 py-4 text-sm font-medium border-b-2 transition-all duration-200",
                  isActive
                    ? "text-black border-black"
                    : "text-black/40 border-transparent hover:text-black hover:border-black/30",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-[10px] font-semibold mr-2 tabular-nums transition-colors duration-200",
                    isActive ? "text-black/40" : "text-black/25",
                  ].join(" ")}
                >
                  {pkg.index}
                </span>
                {pkg.title}
                {pkg.featured && (
                  <span className="ml-2 text-[9px] font-bold uppercase tracking-widest bg-black text-white px-1.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
