import React from "react";

const ScrollableLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a1f0f] text-white">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#051008] via-[#0a1f0f] to-[#0d2612]" />
      <div className="relative min-h-screen scroll-smooth">{children}</div>
    </div>
  );
};

export default ScrollableLayout;
