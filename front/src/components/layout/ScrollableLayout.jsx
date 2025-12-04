import React from "react";

const ScrollableLayout = ({ children }) => {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden text-white scroll-smooth">
      <div className="relative">{children}</div>
    </div>
  );
};

export default ScrollableLayout;
