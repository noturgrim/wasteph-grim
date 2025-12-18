import React, { useState } from "react";
import SectionShell from "../common/SectionShell";
import RevealOnScroll from "../common/RevealOnScroll";

const services = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Hauling",
    description: "Mixed, food, residual & construction.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M16 8l-8-4l-6 8h12v6l8-4l-6-6z" />
        <circle cx="9" cy="19" r="2" />
      </svg>
    ),
    title: "Recyclables",
    description: "Carton, plastic, aluminum, copper, metal.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: "Septic",
    description: "Tank siphoning & liquid waste handling.",
  },
];

const CTASection = () => {
  const [company, setCompany] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [location, setLocation] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCompany("");
    setWasteType("");
    setLocation("");
  };

  return (
    <SectionShell
      id="contact"
      label="Get Started"
      headline="Tell us what you need moved."
      subheadline="Share details and we'll reach back with the right program."
      variant="accent"
    >
      <div className="mx-auto max-w-5xl">
        {/* Compact Services Grid */}
        <RevealOnScroll delayClass="delay-200">
          <div className="mb-4 grid gap-3 sm:grid-cols-3 md:mb-5 lg:gap-4">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-xl border-2 border-[#15803d]/30 bg-gradient-to-br from-[#15803d]/15 via-[#15803d]/5 to-transparent p-3 backdrop-blur-sm transition-all duration-300 hover:border-[#15803d] hover:shadow-[0_0_20px_rgba(21,128,61,0.3)] sm:p-3.5"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute right-0 top-0 h-full w-full rounded-xl bg-gradient-to-br from-[#15803d]/20 to-transparent" />
                </div>

                <div className="relative flex items-start gap-2.5">
                  <div className="flex-shrink-0 rounded-lg bg-[#15803d] p-2 text-white shadow-[0_0_12px_rgba(21,128,61,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(21,128,61,0.6)]">
                    {service.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-black uppercase tracking-wide text-white">
                      {service.title}
                    </h3>
                    <p className="mt-0.5 text-xs leading-snug text-white/70">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Compact Form */}
        <RevealOnScroll delayClass="delay-300">
          <form
            className="relative overflow-hidden rounded-xl border-2 border-[#15803d]/50 bg-gradient-to-br from-[#15803d]/20 via-[#0a1f0f]/95 to-[#051008]/90 p-5 shadow-[0_0_40px_rgba(21,128,61,0.3)] backdrop-blur-xl sm:p-6 md:p-7"
            onSubmit={handleSubmit}
          >
            {/* Decorative gradient - brighter */}
            <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 -translate-y-32 translate-x-32 rounded-full bg-[#15803d]/25 blur-3xl" />

            <div className="relative space-y-3.5 sm:space-y-4">
              {/* Form fields - compact */}
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="group relative space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-[#15803d] sm:text-sm">
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Company / Site
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 border-white/30 bg-white/[0.08] px-3 py-2 text-sm font-medium text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-[#15803d]/10 focus:shadow-[0_0_25px_rgba(21,128,61,0.4)] sm:text-base"
                    placeholder="Enter business name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                  />
                </label>

                <label className="group relative space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-[#15803d] sm:text-sm">
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Waste Type
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 border-white/30 bg-white/[0.08] px-3 py-2 text-sm font-medium text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-[#15803d]/10 focus:shadow-[0_0_25px_rgba(21,128,61,0.4)] sm:text-base"
                    placeholder="Mixed, food, residual..."
                    value={wasteType}
                    onChange={(e) => setWasteType(e.target.value)}
                    onFocus={() => setFocusedField("wasteType")}
                    onBlur={() => setFocusedField(null)}
                  />
                </label>
              </div>

              <label className="group relative space-y-1.5">
                <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-[#15803d] sm:text-sm">
                  <svg
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Location
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border-2 border-white/30 bg-white/[0.08] px-3 py-2 text-sm font-medium text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-[#15803d]/10 focus:shadow-[0_0_25px_rgba(21,128,61,0.4)] sm:text-base"
                  placeholder="City or site address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setFocusedField("location")}
                  onBlur={() => setFocusedField(null)}
                />
              </label>

              {/* Compact Submit button */}
              <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#15803d] to-[#16a34a] px-8 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[0_6px_25px_rgba(21,128,61,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_35px_rgba(21,128,61,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-10 sm:text-base"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Contact Us
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <div className="flex flex-col items-center gap-0.5 text-center sm:items-start sm:text-left">
                  <span className="text-[10px] font-medium text-white/50 sm:text-xs">
                    or email us
                  </span>
                  <a
                    href="mailto:info@wasteph.com"
                    className="text-sm font-bold text-[#15803d] transition-colors hover:text-[#16a34a] sm:text-base"
                  >
                    info@wasteph.com
                  </a>
                </div>
              </div>
            </div>
          </form>
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
};

export default CTASection;
