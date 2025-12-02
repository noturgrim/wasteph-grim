import React from "react";
import ParallaxLayer from "../common/ParallaxLayer";
import RevealOnScroll from "../common/RevealOnScroll";

const streams = [
  {
    label: "Mixed Waste",
    year: "2025",
    description: "General refuse from commercial and residential sites.",
  },
  {
    label: "Food Waste",
    year: "2025",
    description: "Organic streams from kitchens, canteens, and F&B sites.",
  },
  {
    label: "Residual Waste",
    year: "2025",
    description: "Non-recyclable materials destined for safe disposal.",
  },
  {
    label: "Construction Debris",
    year: "Projects",
    description: "Concrete, soil, and demolition material from builds.",
  },
  {
    label: "Recyclables",
    year: "Partners",
    description: "Carton, plastic, aluminum, copper, metal, and more.",
  },
  {
    label: "Septic & Liquid",
    year: "Critical",
    description: "Septic tank and liquid waste for compliant treatment.",
  },
];

const WasteStreamsShowcase = () => {
  return (
    <section
      id="waste-streams"
      className="relative snap-start border-y border-white/10 bg-gradient-to-b from-[#15803d]/10 via-transparent to-black py-24 md:py-32 lg:py-40"
      aria-labelledby="waste-streams-title"
    >
      <ParallaxLayer
        speed={0.2}
        className="pointer-events-none absolute bottom-20 right-20 -z-10 h-[500px] w-[500px] animate-pulse-glow rounded-full bg-[#15803d]/30 blur-[120px]"
      />
      <ParallaxLayer
        speed={-0.15}
        className="pointer-events-none absolute left-10 top-20 -z-10 h-[400px] w-[400px] rounded-full bg-[#16a34a]/20 blur-[100px]"
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-6 lg:px-12">
        <div className="grid gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-start md:gap-20">
          <div className="space-y-10">
            <RevealOnScroll>
              <div className="flex items-center gap-4">
                <span className="h-px w-16 bg-gradient-to-r from-[#15803d] to-transparent" />
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/60">
                  Waste Streams
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-100">
              <h2
                id="waste-streams-title"
                className="text-[clamp(3rem,10vw,6rem)] font-black uppercase leading-[0.9] tracking-tighter text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                Hall of
                <br />
                Streams
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-200">
              <p className="max-w-md text-lg leading-relaxed text-white/70">
                From everyday mixed waste to specialized recyclables and septic
                streams, Waste PH manages a wide hall of materials with the same
                focus:{" "}
                <strong className="font-bold text-white">
                  responsible, traceable handling
                </strong>
                .
              </p>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-300">
              <p className="border-l-4 border-[#15803d] pl-5 text-sm font-semibold uppercase tracking-wide text-white/60">
                Mixed · Food · Residual · Construction · Recyclables · Septic
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delayClass="delay-[400ms]">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 p-8 backdrop-blur">
              <ParallaxLayer
                speed={0.08}
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#15803d]/10 via-transparent to-transparent"
              />
              <div className="mb-8 flex items-center justify-between gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/80">
                  Streams Rail
                </p>
                <p className="text-sm text-white/60">Scroll to view more →</p>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 lg:gap-8">
                {streams.map((stream, index) => (
                  <article
                    key={stream.label}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                    className="min-w-[280px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#15803d] hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(21,128,61,0.3)]"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                      {stream.year}
                    </p>
                    <h3 className="mt-4 text-xl font-black text-white">
                      {stream.label}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-white/70">
                      {stream.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default WasteStreamsShowcase;
