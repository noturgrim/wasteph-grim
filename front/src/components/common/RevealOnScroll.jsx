import React, { useEffect, useRef, useState } from "react";

const RevealOnScroll = ({ children, delayClass = "", className = "" }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleEntries = (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observerInstance.disconnect();
      });
    };

    const observer = new IntersectionObserver(handleEntries, {
      threshold: 0.15,
      rootMargin: "-50px",
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const baseClasses =
    "transform-gpu transition-all duration-1000 ease-out will-change-transform will-change-opacity";
  const hiddenClasses = "opacity-0 translate-y-16 scale-95";
  const shownClasses = "opacity-100 translate-y-0 scale-100";

  const resolvedClasses = `${baseClasses} ${
    isVisible ? shownClasses : hiddenClasses
  } ${delayClass} ${className}`;

  return (
    <div ref={containerRef} className={resolvedClasses}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
