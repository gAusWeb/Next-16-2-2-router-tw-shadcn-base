import { Card, CardContent } from "@/components/ui/card";
import { Home, ClipboardList, Sofa } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Full Home Staging",
    description:
      "We transform every room of your vacant property with curated furniture, artwork, and accessories — creating an aspirational lifestyle buyers immediately connect with.",
  },
  {
    icon: ClipboardList,
    title: "Staging Consultation",
    description:
      "Already have furniture? Our expert stagers assess your home and provide a detailed action plan to maximise appeal before listing — no full staging required.",
  },
  {
    icon: Sofa,
    title: "Furniture Rental",
    description:
      "Access our extensive warehouse of premium furniture and décor. Flexible rental periods to suit your sales timeline, with white-glove delivery and setup included.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-black/40 font-medium mb-3">
            What We Offer
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-black leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Services
          </h2>
          <p className="mt-4 text-base text-black/55 max-w-xl mx-auto leading-relaxed">
            From vacant properties to occupied homes preparing to sell, we have
            a service tailored to your needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group border border-black/8 rounded-2xl shadow-none hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white overflow-hidden"
              >
                <CardContent className="p-8 flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold text-black mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-black/55 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
