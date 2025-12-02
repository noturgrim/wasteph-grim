import React from "react";
import SectionShell from "../common/SectionShell";
import RevealOnScroll from "../common/RevealOnScroll";

const steps = [
  {
    label: "1. Schedule",
    description:
      "Share your site, waste streams, and frequency so we can match the right hauling solution.",
  },
  {
    label: "2. Collect",
    description:
      "Our trucks arrive on time with trained crews to safely load waste from your site.",
  },
  {
    label: "3. Sort & Process",
    description:
      "We separate recyclables, residuals, and special streams for the right downstream path.",
  },
  {
    label: "4. Responsible Disposal",
    description:
      "Waste is handled with traceability and compliance, reducing impact on communities.",
  },
];

const ProcessSection = () => {
  return (
    <SectionShell
      id="process"
      label="How It Works"
      headline="Clean, simple, and predictable waste handling."
      subheadline="A clear four-step process from first contact to final disposal helps your team stay confident and compliant."
      variant="default"
    >
      <div className="relative">
        <div className="absolute inset-x-16 top-16 hidden h-px bg-gradient-to-r from-transparent via-[#15803d]/60 to-transparent md:block" />
        <ol className="grid gap-8 md:grid-cols-4 lg:gap-10">
          {steps.map((step, index) => (
            <RevealOnScroll
              key={step.label}
              delayClass={`delay-[${(index + 1) * 100}ms]`}
            >
              <li className="group relative rounded-2xl border border-white/20 bg-black/40 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-[#15803d] hover:bg-black/60 hover:shadow-[0_30px_80px_rgba(21,128,61,0.3)]">
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#15803d] text-2xl font-black text-white shadow-[0_0_40px_rgba(21,128,61,0.4)] transition-all group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(21,128,61,0.6)]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                    {step.label.split(". ")[1]}
                  </p>
                </div>
                <p className="text-base leading-relaxed text-white/70">
                  {step.description}
                </p>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
};

export default ProcessSection;
