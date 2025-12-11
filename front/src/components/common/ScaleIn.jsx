import React from "react";
import { motion } from "framer-motion";

/**
 * ScaleIn - Simple scale and fade in animation
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Delay before animation starts (in seconds)
 * @param {number} [props.duration=0.8] - Animation duration (in seconds)
 * @param {number} [props.initialScale=0.9] - Starting scale value
 * @param {string} [props.className] - Additional CSS classes
 */
const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.8,
  initialScale = 0.9,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
