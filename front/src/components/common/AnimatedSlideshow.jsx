import React, { createContext, useContext, useState, useCallback } from "react";
import { MotionConfig, motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Context for managing the active slide state
 */
const SlideShowContext = createContext(undefined);

export const useSlideShowContext = () => {
  const context = useContext(SlideShowContext);
  if (context === undefined) {
    throw new Error(
      "useSlideShowContext must be used within a SlideShowProvider"
    );
  }
  return context;
};

/**
 * Split text into words and characters for animation
 */
const splitText = (text) => {
  const words = text.split(" ").map((word) => word.concat(" "));
  const characters = words.map((word) => word.split("")).flat(1);

  return {
    words,
    characters,
  };
};

/**
 * Main SlideShow container component
 */
export const SlideShow = ({ children, className, defaultSlide = 0 }) => {
  const [activeSlide, setActiveSlide] = useState(defaultSlide);
  const changeSlide = useCallback(
    (index) => setActiveSlide(index),
    [setActiveSlide]
  );

  return (
    <SlideShowContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className}>{children}</div>
    </SlideShowContext.Provider>
  );
};

/**
 * Animated text component with stagger hover effect
 */
export const SlideShowText = ({ text, index, className }) => {
  const { activeSlide, changeSlide } = useSlideShowContext();
  const { characters } = splitText(text);
  const isActive = activeSlide === index;

  const handleMouseEnter = () => changeSlide(index);

  return (
    <span
      className={cn(
        "relative inline-block origin-bottom overflow-hidden cursor-pointer",
        className
      )}
      onMouseEnter={handleMouseEnter}
    >
      {characters.map((char, charIndex) => (
        <span
          key={`${char}-${charIndex}`}
          className="relative inline-block overflow-hidden"
        >
          <MotionConfig
            transition={{
              delay: charIndex * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="inline-block opacity-20"
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && charIndex < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block opacity-100"
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  );
};

/**
 * Image wrapper container (grid layout for overlapping images)
 */
export const SlideShowImageWrap = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Clip path variants for image reveal animation
 */
const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};

/**
 * Animated image component with clip path reveal
 */
export const SlideShowImage = ({ index, imageUrl, alt, className }) => {
  const { activeSlide } = useSlideShowContext();

  return (
    <motion.img
      src={imageUrl}
      alt={alt}
      className={cn(
        "inline-block align-middle h-full w-full object-cover",
        className
      )}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
    />
  );
};
