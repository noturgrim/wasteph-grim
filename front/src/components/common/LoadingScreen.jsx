import React, { useEffect, useState, useRef, useCallback } from "react";

/**
 * Optimized LoadingScreen component - Minimal & Professional
 * Performance improvements:
 * - Uses requestAnimationFrame instead of setInterval
 * - Reduces re-renders with refs
 * - GPU accelerated animations
 * - Memoized callbacks
 */
const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  // Memoize the completion callback
  const handleComplete = useCallback(() => {
    document.body.style.overflow = "unset";
    if (onLoadingComplete) onLoadingComplete();
  }, [onLoadingComplete]);

  useEffect(() => {
    // Block scrolling
    document.body.style.overflow = "hidden";

    const duration = 1000; // 1 second
    startTimeRef.current = performance.now();

    // Use requestAnimationFrame for smoother animation
    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          // Call completion callback after fade completes
          setTimeout(handleComplete, 800);
        }, 200);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.body.style.overflow = "unset";
    };
  }, [handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #0a1f0f 0%, #051008 100%)",
        willChange: isExiting ? "auto" : "opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] animate-pulse-glow rounded-full bg-[#15803d]/5 blur-[120px]" />
      </div>

      {/* Minimal grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(21, 128, 61, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(21, 128, 61, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative flex flex-col items-center gap-10">
        {/* Brand Logo Area */}
        <div className="relative">
          {/* Single subtle glow */}
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-[#15803d]/20 blur-[60px]" />

          {/* Main logo circle */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            {/* Animated progress circle */}
            <svg
              className="h-32 w-32 -rotate-90"
              viewBox="0 0 100 100"
              style={{
                willChange: progress < 100 ? "transform" : "auto",
                filter: "drop-shadow(0 0 10px rgba(21, 128, 61, 0.3))",
              }}
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(21, 128, 61, 0.1)"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#15803d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                style={{
                  transition: "stroke-dashoffset 0.1s linear",
                  willChange: progress < 100 ? "stroke-dashoffset" : "auto",
                }}
              />
            </svg>

            {/* Center icon - Clean leaf */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#15803d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Company Name - Professional */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-black uppercase tracking-[0.2em] text-white sm:text-5xl">
            Waste<span className="text-[#15803d]">PH</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-gradient-to-r from-transparent via-[#15803d]/40 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
              Responsible Waste Management
            </p>
            <div className="h-px w-6 bg-gradient-to-r from-transparent via-[#15803d]/40 to-transparent" />
          </div>
        </div>

        {/* Clean Progress Bar */}
        <div className="w-80 space-y-4">
          {/* Progress bar with subtle styling */}
          <div className="relative overflow-hidden rounded-full border border-white/5 bg-white/[0.02] p-1">
            <div className="relative h-1 overflow-hidden rounded-full bg-black/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#15803d] to-[#16a34a]"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 12px rgba(21, 128, 61, 0.4)",
                  transition: "width 0.1s linear",
                  transform: "translate3d(0, 0, 0)",
                  willChange: progress < 100 ? "width" : "auto",
                }}
              />
            </div>
          </div>

          {/* Progress percentage - Centered and clean */}
          <div className="flex items-center justify-center">
            <p className="text-sm font-semibold tabular-nums text-[#15803d]">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Simple loading message */}
          <p className="text-center text-[10px] font-medium uppercase tracking-wider text-white/25">
            {progress < 50 && "Loading"}
            {progress >= 50 && progress < 90 && "Preparing"}
            {progress >= 90 && "Ready"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
