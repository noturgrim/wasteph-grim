import React from "react";
import SectionShell from "../common/SectionShell";
import RevealOnScroll from "../common/RevealOnScroll";

const steps = [
  {
    label: "Schedule",
    description:
      "Share your site, waste streams, and frequency for the right solution.",
  },
  {
    label: "Collect",
    description:
      "Our trucks arrive on time with trained crews to safely load waste.",
  },
  {
    label: "Sort & Process",
    description:
      "We separate recyclables, residuals, and special streams properly.",
  },
  {
    label: "Disposal",
    description:
      "Waste handled with traceability and compliance, reducing impact.",
  },
];

const ProcessSection = () => {
  return (
    <SectionShell
      id="process"
      label="How It Works"
      headline="Clean, simple, predictable."
      subheadline="Four steps from contact to disposal—keeping you confident and compliant."
      variant="default"
    >
      <div className="relative">
        <div className="absolute inset-x-16 top-12 hidden h-px bg-gradient-to-r from-transparent via-[#15803d]/60 to-transparent md:block lg:top-14" />
        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => (
            <RevealOnScroll
              key={step.label}
              delayClass={`delay-[${(index + 1) * 100}ms]`}
            >
              <li className="group relative rounded-xl border border-white/20 bg-black/40 p-4 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[#15803d] hover:bg-black/60 hover:shadow-[0_15px_40px_rgba(21,128,61,0.3)] sm:p-5 lg:p-6">
                <div className="mb-3 flex items-center gap-3 sm:mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#15803d] text-lg font-black text-white shadow-[0_0_30px_rgba(21,128,61,0.4)] transition-all group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(21,128,61,0.6)] sm:h-12 sm:w-12 sm:text-xl lg:text-2xl">
                    {index + 1}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm sm:tracking-[0.25em]">
                    {step.label}
                  </p>
                </div>
                <p className="text-xs leading-snug text-white/70 sm:text-sm sm:leading-relaxed">
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
