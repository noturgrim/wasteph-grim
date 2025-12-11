import React from "react";
import { motion } from "framer-motion";

/**
 * FloatAnimation - Gentle floating/drift animation
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Initial delay
 * @param {number} [props.duration=3] - Duration of one float cycle
 * @param {number} [props.distance=10] - Distance to float (in pixels)
 * @param {string} [props.className] - Additional CSS classes
 */
const FloatAnimation = ({
  children,
  delay = 0,
  duration = 3,
  distance = 10,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-distance, distance, -distance] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatAnimation;
