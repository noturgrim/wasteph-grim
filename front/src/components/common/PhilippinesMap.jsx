import React, { useState, useEffect } from "react";
import Philippines from "@react-map/philippines";

const PhilippinesMap = ({
  selectedProvince = "Cebu",
  highlightCebu = true,
  className = "",
}) => {
  // Add CSS to highlight Cebu
  useEffect(() => {
    if (highlightCebu && selectedProvince) {
      const style = document.createElement("style");
      style.textContent = `
        [id*="${selectedProvince}"] {
          fill: rgba(21, 128, 61, 0.9) !important;
          stroke: rgba(34, 197, 94, 1) !important;
          stroke-width: 2 !important;
          filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)) !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [highlightCebu, selectedProvince]);

  return (
    <div
      className={`relative flex h-96 w-96 items-center justify-center ${className}`}
    >
      <div className="relative h-full w-full">
        <div className="flex h-full items-center justify-center">
          <Philippines
            type="select-single"
            size={400}
            mapColor="rgba(255, 255, 255, 0.25)"
            strokeColor="rgba(255, 255, 255, 0.5)"
            strokeWidth={1}
            hoverColor="rgba(34, 197, 94, 0.3)"
            selectColor="rgba(21, 128, 61, 0.9)"
            hints={true}
            hintTextColor="#ffffff"
            hintBackgroundColor="rgba(0, 0, 0, 0.8)"
            hintPadding="8px"
            hintBorderRadius="4px"
            onSelect={(provinceCode) => {
              console.log("✅ Province selected:", provinceCode);
            }}
            aria-label="Map of the Philippines with Cebu highlighted"
          />
        </div>
      </div>
    </div>
  );
};

export default PhilippinesMap;
