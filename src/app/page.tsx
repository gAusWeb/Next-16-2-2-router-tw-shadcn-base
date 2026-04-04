import Navigation from "@/components/Navigation";
import HeroSlideshow from "@/components/HeroSlideshow";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        <HeroSlideshow />
        <ServicesSection />
        <WhyUsSection />
      </main>
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span
              className="font-bold text-xl text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              MFD Creative Staging
            </span>
            <p className="text-xs text-white/40 tracking-wide">
              Premium home staging for faster, higher-value sales.
            </p>
          </div>
          <nav
            className="flex flex-wrap justify-center gap-6"
            aria-label="Footer navigation"
          >
            {["Home", "Services", "Portfolio", "About", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </nav>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} MFD Creative Staging. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
