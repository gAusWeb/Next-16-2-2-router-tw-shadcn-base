import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  "Staged homes sell up to 73% faster than un-staged properties",
  "Professional staging consistently achieves higher offer prices",
  "Our in-house designers have over a decade of real estate experience",
  "White-glove service — setup, styling, and pack-down handled entirely by our team",
  "Flexible packages for all property sizes and budgets",
];

export default function WhyUsSection() {
  return (
    <section id="about" className="bg-neutral-50 py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/stagingroom/900/675"
            alt="Beautifully staged living room"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Floating stat card */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
            <p
              className="text-3xl font-bold text-black leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              500+
            </p>
            <p className="text-xs text-black/50 font-medium mt-1 uppercase tracking-wider">
              Homes Staged
            </p>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-black/40 font-medium mb-3">
              Why Choose Us
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-black leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Staging That Sells
            </h2>
          </div>

          <p className="text-base text-black/55 leading-relaxed">
            We believe every home deserves to be seen at its very best. MFD
            Creative Staging combines interior design expertise with deep real
            estate market knowledge to present your property in a way that
            captures imaginations and drives results.
          </p>

          <ul className="flex flex-col gap-3">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
                <span className="text-sm text-black/70 leading-relaxed">
                  {reason}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-2">
            <Button
              className="rounded-full bg-black text-white hover:bg-black/80 px-7 font-medium"
              size="lg"
            >
              Book a Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-black/20 text-black hover:bg-black/5 px-7 font-medium"
            >
              Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
