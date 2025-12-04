import React, { useState } from "react";
import SectionShell from "../common/SectionShell";
import RevealOnScroll from "../common/RevealOnScroll";

const CTASection = () => {
  const [company, setCompany] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Front-end only for now; hook into your backend or email later.
    // Keeping it silent to remain professional.
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
      <RevealOnScroll delayClass="delay-300">
        <form
          className="grid gap-6 rounded-xl border border-white/20 bg-black/60 p-5 backdrop-blur sm:gap-8 sm:p-6 md:grid-cols-[1fr_1.2fr] md:items-start lg:gap-10 lg:p-8"
          onSubmit={handleSubmit}
        >
          {/* Left: Services Info */}
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-white/70 sm:text-sm">
              For businesses, developments, and facilities in the Philippines.
            </p>
            <div className="grid gap-2 sm:gap-3">
              <div className="rounded-lg border border-[#15803d]/30 bg-[#15803d]/10 p-3 sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                  Hauling
                </p>
                <p className="mt-1 text-xs text-white/70 sm:mt-2 sm:text-sm">
                  Mixed, food, residual & construction.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                  Recyclables
                </p>
                <p className="mt-1 text-xs text-white/70 sm:mt-2 sm:text-sm">
                  Carton, plastic, aluminum, copper, metal.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                  Septic
                </p>
                <p className="mt-1 text-xs text-white/70 sm:mt-2 sm:text-sm">
                  Tank siphoning & liquid waste handling.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="space-y-4 sm:space-y-5">
            <div className="grid gap-3 sm:gap-4">
              <label className="space-y-1.5 text-sm text-white sm:space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                  Company / Site
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-white/10 sm:px-4 sm:py-3 sm:text-sm"
                  placeholder="Business name or location"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </label>
              <label className="space-y-1.5 text-sm text-white sm:space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                  Waste Type
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-white/10 sm:px-4 sm:py-3 sm:text-sm"
                  placeholder="Mixed, food, residual..."
                  value={wasteType}
                  onChange={(event) => setWasteType(event.target.value)}
                />
              </label>
              <label className="space-y-1.5 text-sm text-white sm:space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                  Location
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-white/10 sm:px-4 sm:py-3 sm:text-sm"
                  placeholder="City or site address"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                type="submit"
                className="rounded-full bg-[#15803d] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:scale-105 hover:bg-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-sm"
              >
                Contact Us
              </button>
              <p className="text-center text-[10px] text-white/60 sm:text-xs">
                Or email{" "}
                <a
                  href="mailto:info@wasteph.com"
                  className="font-bold text-white underline underline-offset-2 transition-colors hover:text-[#15803d]"
                >
                  info@wasteph.com
                </a>
              </p>
            </div>
          </div>
        </form>
      </RevealOnScroll>
    </SectionShell>
  );
};

export default CTASection;
