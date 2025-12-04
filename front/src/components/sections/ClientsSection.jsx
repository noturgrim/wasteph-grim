import React from "react";
import flickrLogo from "../../assets/clients/flickr.svg";
import metaLogo from "../../assets/clients/meta.svg";
import tiktokLogo from "../../assets/clients/tiktok.svg";
import youtubeLogo from "../../assets/clients/youtube.svg";

// Client data with imported SVG logos
const clients = [
  { name: "Flickr", logo: flickrLogo },
  { name: "Meta", logo: metaLogo },
  { name: "TikTok", logo: tiktokLogo },
  { name: "YouTube", logo: youtubeLogo },
];

const ClientsSection = () => {
  // Duplicate the array for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section
      id="clients"
      className="relative flex w-full min-h-[40vh] snap-start flex-col items-center justify-center border-y border-white/5 py-12 md:py-16"
    >
      {/* Section title - centered */}
      <div className="mb-8 text-center md:mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">
          Trusted By Leading Organizations
        </p>
      </div>

      {/* Full-width infinite scroll container */}
      <div className="relative w-full">
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0a1f0f] to-transparent md:w-48 lg:w-64" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0a1f0f] to-transparent md:w-48 lg:w-64" />

        {/* Scrolling track - full width */}
        <div className="flex w-full overflow-x-clip overflow-y-visible">
          <div className="flex animate-scroll-infinite gap-8 sm:gap-12 md:gap-16">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="group flex min-w-[140px] items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[#15803d]/30 hover:bg-white/5 sm:min-w-[160px] sm:px-6 sm:py-4 md:min-w-[180px]"
              >
                <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="flex h-8 items-center justify-center transition-all duration-300 group-hover:scale-110 sm:h-10">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="h-5 w-auto opacity-50 brightness-0 invert transition-all duration-300 group-hover:opacity-80 sm:h-6 md:h-7"
                    />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-white/80 sm:text-[10px]">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
