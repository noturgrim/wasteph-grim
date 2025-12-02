import React from "react";
import SectionShell from "../common/SectionShell";
import RevealOnScroll from "../common/RevealOnScroll";

const servicesData = [
  {
    id: "mixed-food-residual-construction",
    title: "Mixed, Food, Residual & Construction Waste",
    description:
      "End-to-end hauling programs for businesses, developments, and communities handling everyday and project-based waste.",
    bullets: [
      "Scheduled or on-call collections",
      "Mixed, food, residual, and construction debris",
      "Fleet sized for tight city access and bulk movements",
    ],
  },
  {
    id: "purchasing-recyclables",
    title: "Purchasing of Recyclables",
    description:
      "We buy carton, plastic, aluminum, copper, metal, and more with transparent weights and fair, repeatable pricing.",
    bullets: [
      "Carton, plastic, aluminum, copper, metal, and more",
      "Recurring volume programs for partners",
      "Documented weights and clear payouts",
    ],
  },
  {
    id: "septic-tank-siphoning",
    title: "Septic Tank Siphoning",
    description:
      "Safe and compliant septic tank siphoning to keep facilities operating smoothly and hygienically.",
    bullets: [
      "Quick-response scheduling",
      "Secure transport and treatment",
      "Preventative maintenance programs",
    ],
  },
];

const ServicesSection = () => {
  return (
    <SectionShell
      id="services"
      label="Our Services"
      headline="Waste hauling built for real-world operations."
      subheadline="From everyday mixed waste to specialized recyclables and septic systems, Waste PH keeps your sites moving and compliant."
      variant="default"
    >
      <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
        {servicesData.map((service, index) => (
          <RevealOnScroll
            key={service.id}
            delayClass={`delay-[${(index + 1) * 100}ms]`}
          >
            <article className="group flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/40 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-[#15803d] hover:bg-black/60 hover:shadow-[0_30px_80px_rgba(21,128,61,0.3)] focus-within:-translate-y-3">
              <header className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-8 bg-[#15803d]" />
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                    {service.id === "purchasing-recyclables"
                      ? "Recyclables"
                      : service.id === "septic-tank-siphoning"
                      ? "Septic"
                      : "Waste Hauling"}
                  </p>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
              </header>

              <ul className="mt-6 space-y-3 text-sm text-white/60">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#15803d]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-white/70 transition-colors group-hover:text-[#15803d] focus-visible:text-[#15803d] focus-visible:outline-none"
                >
                  <span>More Details</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </SectionShell>
  );
};

export default ServicesSection;
