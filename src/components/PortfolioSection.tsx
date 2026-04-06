"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  id: string;
  name: string;
  location: string;
  images: ProjectImage[];
}

const PROJECTS: Project[] = [
  {
    id: "toorak",
    name: "Toorak Residence",
    location: "Toorak, VIC",
    images: [
      {
        src: "https://picsum.photos/seed/toorak-living/1200/800",
        alt: "Living room with contemporary furnishings",
      },
      {
        src: "https://picsum.photos/seed/toorak-master/1200/800",
        alt: "Master bedroom with luxurious bedding",
      },
      {
        src: "https://picsum.photos/seed/toorak-dining/1200/800",
        alt: "Formal dining room",
      },
      {
        src: "https://picsum.photos/seed/toorak-study/1200/800",
        alt: "Home office and study",
      },
      {
        src: "https://picsum.photos/seed/toorak-entry/1200/800",
        alt: "Grand entry foyer",
      },
      {
        src: "https://picsum.photos/seed/toorak-outdoor/1200/800",
        alt: "Alfresco entertaining area",
      },
    ],
  },
  {
    id: "southyarra",
    name: "South Yarra Apartment",
    location: "South Yarra, VIC",
    images: [
      {
        src: "https://picsum.photos/seed/sy-open/1200/800",
        alt: "Open-plan living and dining",
      },
      {
        src: "https://picsum.photos/seed/sy-bedroom/1200/800",
        alt: "Bedroom with city views",
      },
      {
        src: "https://picsum.photos/seed/sy-kitchen/1200/800",
        alt: "Modern kitchen styling",
      },
      {
        src: "https://picsum.photos/seed/sy-balcony/1200/800",
        alt: "Balcony outdoor setting",
      },
    ],
  },
  {
    id: "brighton",
    name: "Brighton Beachside Home",
    location: "Brighton, VIC",
    images: [
      {
        src: "https://picsum.photos/seed/bton-living/1200/800",
        alt: "Coastal living room",
      },
      {
        src: "https://picsum.photos/seed/bton-master/1200/800",
        alt: "Master bedroom retreat",
      },
      {
        src: "https://picsum.photos/seed/bton-kids/1200/800",
        alt: "Children's bedroom",
      },
      {
        src: "https://picsum.photos/seed/bton-kitchen/1200/800",
        alt: "Kitchen and dining area",
      },
      {
        src: "https://picsum.photos/seed/bton-outdoor/1200/800",
        alt: "Garden and alfresco area",
      },
    ],
  },
  {
    id: "camberwell",
    name: "Camberwell Family Home",
    location: "Camberwell, VIC",
    images: [
      {
        src: "https://picsum.photos/seed/camb-living/1200/800",
        alt: "Spacious family living room",
      },
      {
        src: "https://picsum.photos/seed/camb-dining/1200/800",
        alt: "Dining room with classic styling",
      },
      {
        src: "https://picsum.photos/seed/camb-master/1200/800",
        alt: "Serene master suite",
      },
      {
        src: "https://picsum.photos/seed/camb-study/1200/800",
        alt: "Home library and study",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PortfolioSection() {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const openLightbox = useCallback((project: Project, index: number) => {
    setActiveProject(project);
    setStartIndex(index);
    setCurrent(index);
    setOpen(true);
  }, []);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    // Unmount carousel cleanly after close animation so embla reinitialises fresh on reopen
    if (!next) {
      setTimeout(() => setActiveProject(null), 200);
    }
  }, []);

  // Track the active slide index for the counter and thumbnail highlight
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("init", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("init", onSelect);
      api.off("select", onSelect);
    };
  }, [api]);

  // Arrow key navigation when the lightbox is open.
  // Use capture phase so we intercept before Radix Dialog's focus-management handler.
  useEffect(() => {
    if (!open || !api) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        api.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        api.scrollNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [open, api]);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest font-medium text-neutral-400 mb-3">
            Portfolio
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-black mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Work
          </h2>
          <p className="text-neutral-500 max-w-xl text-sm leading-relaxed">
            Every property tells a story. Browse our recent staging projects and
            see how thoughtful design transforms spaces and drives exceptional
            results.
          </p>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-14">
          {PROJECTS.map((project) => (
            <article key={project.id}>
              {/* Project label row */}
              <div className="flex items-baseline gap-3 mb-4">
                <h3
                  className="text-base font-semibold text-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {project.name}
                </h3>
                <span className="text-xs text-neutral-400 tracking-wide">
                  {project.location}
                </span>
                <span className="ml-auto text-xs text-neutral-400 tabular-nums">
                  {project.images.length} photos
                </span>
              </div>

              {/* Thumbnail grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openLightbox(project, i)}
                    className="relative aspect-4/3 overflow-hidden rounded group focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    aria-label={`View ${project.name}: ${img.alt}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox — only mounted while a project is active */}
      {activeProject && (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent
            showCloseButton={false}
            className="top-0 left-0 right-0 bottom-0 translate-x-0 translate-y-0 max-w-none sm:max-w-none w-screen h-screen rounded-none bg-black p-0 gap-0 ring-0 text-white flex flex-col"
          >
            {/* Top bar */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <p
                  className="text-white font-semibold text-sm leading-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {activeProject.name}
                </p>
                <p className="text-white/40 text-xs mt-1.5 tabular-nums">
                  {current + 1} / {activeProject.images.length}
                </p>
              </div>
              <DialogClose className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <XIcon className="w-5 h-5" />
                <span className="sr-only">Close gallery</span>
              </DialogClose>
            </div>

            {/* Main image carousel */}
            <div className="flex-1 min-h-0 flex items-center">
              <Carousel
                setApi={setApi}
                opts={{ loop: true, startIndex }}
                className="w-full"
              >
                <CarouselContent>
                  {activeProject.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <div
                        className="relative w-full"
                        style={{ height: "calc(100dvh - 10rem)" }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="100vw"
                          className="object-contain"
                          priority={i === startIndex}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-black/50 border-white/20 text-white hover:bg-black/80 hover:text-white disabled:opacity-20 hover:border-white/40" />
                <CarouselNext className="right-4 bg-black/50 border-white/20 text-white hover:bg-black/80 hover:text-white disabled:opacity-20 hover:border-white/40" />
              </Carousel>
            </div>

            {/* Thumbnail strip */}
            <div className="shrink-0 border-t border-white/10 px-6 py-3 flex gap-2 overflow-x-auto">
              {activeProject.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    api?.scrollTo(i);
                    setCurrent(i);
                  }}
                  className={[
                    "relative w-14 h-10 shrink-0 rounded overflow-hidden",
                    "focus:outline-none focus-visible:ring-1 focus-visible:ring-white",
                    "transition-opacity duration-200",
                    i === current
                      ? "opacity-100 ring-1 ring-white ring-offset-1 ring-offset-black"
                      : "opacity-40 hover:opacity-70",
                  ].join(" ")}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
