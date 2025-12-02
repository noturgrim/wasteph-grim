import React, { useEffect, useState } from "react";

const ParallaxLayer = ({ speed = 0.3, className = "", children }) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const nextOffset = window.scrollY * speed;
      setOffsetY(nextOffset);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  const style = {
    transform: `translate3d(0, ${offsetY}px, 0)`,
    willChange: "transform",
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default ParallaxLayer;
