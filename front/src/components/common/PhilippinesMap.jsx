import React from "react";
import Philippines from "@react-map/philippines";

const PhilippinesMap = ({ highlightCebu = true, className = "" }) => {
  // Cebu province codes in the Philippines map
  const cebuProvinceCodes = ["CEB", "PHI7"];

  const handleProvinceStyle = (province) => {
    // Check if this province is Cebu
    const isCebu =
      province?.properties?.name?.toLowerCase().includes("cebu") ||
      cebuProvinceCodes.includes(province?.properties?.code);

    if (highlightCebu && isCebu) {
      return {
        fill: "rgba(21, 128, 61, 0.9)",
        stroke: "rgba(34, 197, 94, 1)",
        strokeWidth: 2,
        cursor: "pointer",
        filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))",
        transition: "all 0.3s ease",
      };
    }

    return {
      fill: "rgba(255, 255, 255, 0.25)",
      stroke: "rgba(255, 255, 255, 0.5)",
      strokeWidth: 1,
      transition: "all 0.3s ease",
    };
  };

  const handleProvinceHover = (province) => {
    const isCebu =
      province?.properties?.name?.toLowerCase().includes("cebu") ||
      cebuProvinceCodes.includes(province?.properties?.code);

    if (highlightCebu && isCebu) {
      return {
        fill: "rgba(21, 128, 61, 1)",
        stroke: "rgba(34, 197, 94, 1)",
        strokeWidth: 2.5,
        filter: "drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))",
      };
    }

    return {
      fill: "rgba(255, 255, 255, 0.35)",
      stroke: "rgba(255, 255, 255, 0.7)",
      strokeWidth: 1.5,
    };
  };

  return (
    <div
      className={`relative flex h-96 w-96 items-center justify-center ${className}`}
    >
      <div className="relative h-full w-full">
        <div className="flex h-full items-center justify-center">
          <Philippines
            type="select-single"
            size="100%"
            mapColor="rgba(255, 255, 255, 0.25)"
            strokeColor="rgba(255, 255, 255, 0.5)"
            strokeWidth={1}
            selectColor="rgba(21, 128, 61, 0.9)"
            hintColor="rgba(34, 197, 94, 0.5)"
            customStyle={handleProvinceStyle}
            onHover={handleProvinceHover}
            aria-label="Map of the Philippines with Cebu highlighted"
          />
        </div>

        {/* Cebu Label Overlay */}
        {highlightCebu && (
          <div className="absolute left-[55%] top-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="flex flex-col items-center gap-1 animate-pulse">
              <div className="rounded-full bg-gradient-to-br from-[#15803d] to-[#22c55e] p-2.5 shadow-lg shadow-[#15803d]/50">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#22c55e] drop-shadow-lg">
                Cebu
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhilippinesMap;
