import React from "react";
import ParallaxLayer from "../common/ParallaxLayer";
import RevealOnScroll from "../common/RevealOnScroll";
import { scrollToSection } from "../../utils/scrollToSection";

const HeroSection = () => {
  const handlePrimaryClick = () => {
    scrollToSection("contact");
  };

  const handleSecondaryClick = () => {
    scrollToSection("services");
  };

  const handlePrimaryKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    scrollToSection("contact");
  };

  const handleSecondaryKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    scrollToSection("services");
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen snap-start items-center overflow-hidden pb-20 pt-32 md:pt-40"
      aria-labelledby="hero-title"
    >
      {/* Multiple layered parallax backgrounds */}
      <ParallaxLayer
        speed={0.2}
        className="pointer-events-none absolute -left-80 top-0 -z-10 h-[800px] w-[800px] animate-pulse-glow rounded-full bg-[#15803d]/40 blur-[160px]"
      />
      <ParallaxLayer
        speed={-0.15}
        className="pointer-events-none absolute -right-80 bottom-10 -z-10 h-[700px] w-[700px] animate-pulse-glow rounded-full bg-[#16a34a]/35 blur-[140px]"
      />
      <ParallaxLayer
        speed={0.25}
        className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#15803d]/25 blur-[120px]"
      />

      {/* Animated grid pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(21, 128, 61, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(21, 128, 61, 0.3) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 lg:gap-20 lg:px-12 xl:px-16">
        {/* Hero Content */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <RevealOnScroll>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#15803d]/20 ring-1 ring-[#15803d]/40">
                  <svg
                    className="h-6 w-6 text-[#15803d]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.95-1.26-7-5.37-7-9.5V8.3l7-3.11 7 3.11V11c0 4.13-3.05 8.24-7 9.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/70">
                    Philippines
                  </p>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-[#15803d]">
                    Waste Management
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-100">
              <h1 id="hero-title" className="mb-6">
                <span
                  className="block text-[clamp(4rem,15vw,12rem)] font-black uppercase leading-[0.85] tracking-tighter text-white"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Waste
                </span>
                <span
                  className="block text-[clamp(4rem,15vw,12rem)] font-black uppercase leading-[0.85] tracking-tighter text-transparent"
                  style={{
                    letterSpacing: "-0.03em",
                    WebkitTextStroke: "2px #15803d",
                    textStroke: "2px #15803d",
                  }}
                >
                  PH
                </span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-200">
              <p className="mb-8 max-w-2xl text-xl font-semibold leading-relaxed text-white/80 sm:text-2xl lg:text-3xl">
                Responsible waste management for{" "}
                <span className="relative inline-block font-black text-white">
                  businesses
                  <svg
                    className="absolute -bottom-1 left-0 h-3 w-full"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,7 Q50,0 100,7 T200,7"
                      fill="none"
                      stroke="#15803d"
                      strokeWidth="4"
                      opacity="0.6"
                    />
                  </svg>
                </span>
                , developments, and communities across the Philippines.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-300">
              <div className="mb-10 flex flex-wrap items-center gap-4">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Scroll to contact section to get in touch with Waste PH"
                  className="group relative inline-flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#15803d] to-[#16a34a] px-10 py-5 text-sm font-black uppercase tracking-[0.3em] text-white shadow-[0_0_60px_rgba(21,128,61,0.5),0_10px_40px_rgba(0,0,0,0.4)] transition-all hover:scale-[1.05] hover:shadow-[0_0_80px_rgba(22,163,74,0.7),0_15px_50px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                  onClick={handlePrimaryClick}
                  onKeyDown={handlePrimaryKeyDown}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100"
                    style={{ transform: "translateX(-100%)" }}
                  />
                  <span className="relative z-10">Contact Us</span>
                  <svg
                    className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Scroll to services section to view Waste PH services"
                  className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border-2 border-white/30 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all hover:border-[#15803d] hover:bg-[#15803d]/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                  onClick={handleSecondaryClick}
                  onKeyDown={handleSecondaryKeyDown}
                >
                  <span>View Services</span>
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-[400ms]">
              <div className="inline-flex flex-wrap gap-2">
                {[
                  "Mixed",
                  "Food",
                  "Residual",
                  "Construction",
                  "Recyclables",
                  "Septic",
                ].map((item, index) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[#15803d]/30 bg-[#15803d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm transition-all hover:border-[#15803d] hover:bg-[#15803d]/20"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#15803d]" />
                    {item}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Stats & Visual Cards */}
          <div className="relative">
            <RevealOnScroll delayClass="delay-200">
              {/* Stats Grid */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#15803d]/20 to-transparent p-6 backdrop-blur-sm transition-all hover:border-[#15803d]/50 hover:shadow-[0_20px_60px_rgba(21,128,61,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15803d]/0 to-[#15803d]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="relative mb-2 text-5xl font-black text-white">
                    24/7
                  </p>
                  <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                    Available
                  </p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#15803d]/20 to-transparent p-6 backdrop-blur-sm transition-all hover:border-[#15803d]/50 hover:shadow-[0_20px_60px_rgba(21,128,61,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#15803d]/0 to-[#15803d]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="relative mb-2 text-5xl font-black text-white">
                    100%
                  </p>
                  <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                    Compliant
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-300">
              {/* Feature Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-black/40 backdrop-blur-xl">
                <ParallaxLayer speed={-0.08}>
                  <div
                    className="h-[400px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1549989476-69a92fa57c36?auto=format&fit=crop&w=900&q=80')",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                </ParallaxLayer>

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#15803d]/50 bg-[#15803d]/20 px-4 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#15803d]" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
                      Fleet Ready
                    </span>
                  </div>
                  <h3 className="mb-2 text-3xl font-black text-white">
                    Dense City Routes
                  </h3>
                  <p className="text-base text-white/80">
                    Scheduled pickups tailored for businesses, developments, and
                    communities.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
