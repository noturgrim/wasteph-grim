import React from "react";
import { motion } from "framer-motion";

/**
 * FadeInUp - Simple fade and slide up animation
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Delay before animation starts (in seconds)
 * @param {number} [props.duration=0.6] - Animation duration (in seconds)
 * @param {number} [props.distance=20] - Distance to slide up (in pixels)
 * @param {string} [props.className] - Additional CSS classes
 */
const FadeInUp = ({
  children,
  delay = 0,
  duration = 0.6,
  distance = 20,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;
