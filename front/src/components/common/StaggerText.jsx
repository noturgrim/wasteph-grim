import React from "react";
import { motion } from "framer-motion";

/**
 * StaggerText - Animates text letter by letter with stagger effect
 * @param {Object} props
 * @param {string} props.children - Text to animate
 * @param {number} [props.delay=0] - Initial delay before animation starts
 * @param {number} [props.staggerDelay=0.03] - Delay between each letter
 * @param {string} [props.className] - Additional CSS classes
 */
const StaggerText = ({
  children,
  delay = 0,
  staggerDelay = 0.03,
  className = "",
}) => {
  if (!children || typeof children !== "string") {
    return null;
  }

  const letters = children.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default StaggerText;
