"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: "house1",
    url: "https://picsum.photos/seed/house1/1920/1080",
    label: "Transform Empty Spaces",
    tagline:
      "We stage vacant homes with premium furniture and décor so buyers fall in love.",
  },
  {
    id: "interior1",
    url: "https://picsum.photos/seed/interior1/1920/1080",
    label: "First Impressions Sell",
    tagline:
      "Staged homes sell faster and for more — let us show you the difference.",
  },
  {
    id: "livingroom1",
    url: "https://picsum.photos/seed/livingroom1/1920/1080",
    label: "Curated For Every Room",
    tagline:
      "From living rooms to master suites, every space tells a compelling story.",
  },
  {
    id: "bedroom1",
    url: "https://picsum.photos/seed/bedroom1/1920/1080",
    label: "Luxury Meets Lifestyle",
    tagline: "Our designers craft spaces buyers can see themselves living in.",
  },
  {
    id: "kitchen1",
    url: "https://picsum.photos/seed/kitchen1/1920/1080",
    label: "Sell Smarter. Stage First.",
    tagline:
      "Professional staging is the most impactful investment before listing.",
  },
];

const INTERVAL_MS = 5000;
const DRAG_THRESHOLD = 50;

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = React.useRef<number>(0);

  const isPaused = isDragging;

  const startTimer = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
  }, []);

  React.useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, startTimer]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    startTimer();
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer();
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    startTimer();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    // Don't initiate drag when interacting with buttons or links inside the section
    if ((e.target as HTMLElement).closest("button, a")) return;
    dragStartX.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      setActiveIndex((prev) =>
        delta < 0
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length,
      );
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ touchAction: "pan-y", cursor: isDragging ? "grabbing" : "grab" }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === activeIndex ? 1 : 0 }}
          aria-hidden={i !== activeIndex}
        >
          <Image
            src={slide.url}
            alt={slide.label}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Bottom gradient — lifts text content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      {/* Top gradient — ensures nav text always has contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent pointer-events-none" />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div className="max-w-3xl">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
              aria-hidden={i !== activeIndex}
            >
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {slide.label}
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl leading-relaxed">
                {slide.tagline}
              </p>
              <div className="pointer-events-auto flex flex-col md:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 rounded-full px-8 font-semibold text-base h-12"
                >
                  Get a Free Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white/10 rounded-full px-8 font-semibold text-base h-12"
                >
                  View Our Work
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows — hidden on mobile */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/25 text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/25 text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              backgroundColor: i === activeIndex ? "white" : "transparent",
              border: "2px solid white",
              opacity: i === activeIndex ? 1 : 0.6,
              transform: i === activeIndex ? "scale(1.25)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
