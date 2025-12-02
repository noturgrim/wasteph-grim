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
      label="Always Bringing the Fight"
      headline="Tell us what you need moved."
      subheadline="Share a few details about your waste streams and location, and our team will reach back with the right hauling and recyclables program."
      variant="accent"
    >
      <RevealOnScroll delayClass="delay-300">
        <form
          className="grid gap-12 rounded-2xl border border-white/20 bg-black/60 p-10 backdrop-blur md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-center lg:p-12"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-white/70">
              Ideal for businesses, developments, communities, and facilities
              looking for a reliable waste management partner in the
              Philippines.
            </p>
            <div className="grid gap-4">
              <div className="rounded-xl border border-[#15803d]/30 bg-[#15803d]/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Hauling
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Mixed, food, residual, and construction waste.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Recyclables
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Carton, plastic, aluminum, copper, metal, and more.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Septic
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Septic tank siphoning and liquid waste handling.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              <label className="space-y-2 text-sm text-white">
                <span className="block text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  Company / Site
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-white/10"
                  placeholder="Business name, building, or community"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </label>
              <label className="space-y-2 text-sm text-white">
                <span className="block text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  Waste Type
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-white/10"
                  placeholder="Mixed, food, residual, construction..."
                  value={wasteType}
                  onChange={(event) => setWasteType(event.target.value)}
                />
              </label>
              <label className="space-y-2 text-sm text-white">
                <span className="block text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  Location
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/40 focus:border-[#15803d] focus:bg-white/10"
                  placeholder="City, barangay, or site address"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="rounded-full bg-[#15803d] px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white transition-all hover:scale-105 hover:bg-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Contact Us
              </button>
              <p className="text-center text-xs text-white/60">
                Or email us at{" "}
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
