import React, { useRef, useEffect } from "react";

const WaterRipple = ({ color = "#15803d", intensity = 0.5 }) => {
  const canvasRef = useRef(null);
  const rippleMapRef = useRef([]);
  const lastMapRef = useRef([]);
  const textureRef = useRef(null);
  const rippleRef = useRef(null);
  const oldIdxRef = useRef(0);
  const newIdxRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const halfWidth = width >> 1;
      const halfHeight = height >> 1;
      const size = width * (height + 2) * 2;
      const rippleRad = 5;

      oldIdxRef.current = width;
      newIdxRef.current = width * (height + 3);

      // Initialize maps
      rippleMapRef.current = new Array(size).fill(0);
      lastMapRef.current = new Array(size).fill(0);

      // Create topographic map background
      ctx.fillStyle = "#0a1f0f";
      ctx.fillRect(0, 0, width, height);

      // Draw topographic contour lines
      ctx.strokeStyle = "rgba(21, 128, 61, 0.15)";
      ctx.lineWidth = 1.5;

      // Create multiple layers of contour lines
      const centerX = width / 2;
      const centerY = height / 2;

      // Main contour rings (like elevation lines)
      for (let radius = 50; radius < Math.max(width, height); radius += 80) {
        ctx.beginPath();
        const points = 120;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          // Add irregular variations to make it organic
          const variation = Math.sin(angle * 5) * 15 + Math.cos(angle * 3) * 10;
          const r = radius + variation;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Add secondary contour lines at different positions
      const numHills = 4;
      for (let h = 0; h < numHills; h++) {
        const hillX = (width / (numHills + 1)) * (h + 1);
        const hillY = height * (0.3 + Math.random() * 0.4);

        for (let radius = 30; radius < 400; radius += 60) {
          ctx.beginPath();
          const points = 80;
          for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const variation =
              Math.sin(angle * 4) * 12 + Math.cos(angle * 2) * 8;
            const r = radius + variation;
            const x = hillX + Math.cos(angle) * r;
            const y = hillY + Math.sin(angle) * r;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.globalAlpha = 0.6 - radius / 800;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Add diagonal grid lines for technical map look
      ctx.strokeStyle = "rgba(21, 128, 61, 0.06)";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Add subtle gradient overlay for depth
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(width, height) / 2
      );
      gradient.addColorStop(0, "rgba(21, 128, 61, 0.02)");
      gradient.addColorStop(1, "rgba(5, 16, 8, 0.3)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Store texture and ripple
      textureRef.current = ctx.getImageData(0, 0, width, height);
      rippleRef.current = ctx.getImageData(0, 0, width, height);

      // Helper function to create ripple at position
      const dropAt = (dx, dy, strength = 512) => {
        dx = Math.floor(dx);
        dy = Math.floor(dy);

        if (
          dx < rippleRad ||
          dx >= width - rippleRad ||
          dy < rippleRad ||
          dy >= height - rippleRad
        ) {
          return;
        }

        for (let j = dy - rippleRad; j < dy + rippleRad; j++) {
          for (let k = dx - rippleRad; k < dx + rippleRad; k++) {
            const dist = Math.sqrt((k - dx) ** 2 + (j - dy) ** 2);
            if (dist < rippleRad) {
              const idx = oldIdxRef.current + j * width + k;
              if (idx >= 0 && idx < rippleMapRef.current.length) {
                rippleMapRef.current[idx] += strength * (1 - dist / rippleRad);
              }
            }
          }
        }
      };

      // Create new frame
      const newFrame = () => {
        // Swap buffers
        const temp = oldIdxRef.current;
        oldIdxRef.current = newIdxRef.current;
        newIdxRef.current = temp;

        let mapIdx = oldIdxRef.current;
        let i = 0;

        const rippleData = rippleRef.current.data;
        const textureData = textureRef.current.data;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            // Calculate wave propagation
            const data =
              ((rippleMapRef.current[mapIdx - width] || 0) +
                (rippleMapRef.current[mapIdx + width] || 0) +
                (rippleMapRef.current[mapIdx - 1] || 0) +
                (rippleMapRef.current[mapIdx + 1] || 0)) >>
              1;

            const dampedData =
              data - rippleMapRef.current[newIdxRef.current + i] - (data >> 5);
            rippleMapRef.current[newIdxRef.current + i] = dampedData;

            const distortion = 1024 - dampedData;
            const oldDistortion = lastMapRef.current[i];
            lastMapRef.current[i] = distortion;

            if (oldDistortion !== distortion) {
              // Calculate displacement
              let offsetX =
                Math.floor(((x - halfWidth) * distortion) / 1024) + halfWidth;
              let offsetY =
                Math.floor(((y - halfHeight) * distortion) / 1024) + halfHeight;

              // Boundary check
              offsetX = Math.max(0, Math.min(width - 1, offsetX));
              offsetY = Math.max(0, Math.min(height - 1, offsetY));

              const newPixelIdx = (offsetX + offsetY * width) * 4;
              const curPixelIdx = i * 4;

              // Copy pixel data
              rippleData[curPixelIdx] = textureData[newPixelIdx];
              rippleData[curPixelIdx + 1] = textureData[newPixelIdx + 1];
              rippleData[curPixelIdx + 2] = textureData[newPixelIdx + 2];
              rippleData[curPixelIdx + 3] = 255;
            }

            mapIdx++;
            i++;
          }
        }

        ctx.putImageData(rippleRef.current, 0, 0);
      };

      // Animation loop
      const animate = () => {
        newFrame();
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      // Mouse move handler - creates ripples as you move
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dropAt(x, y, 800 * intensity); // Increased strength for more visible ripples
      };

      // Mouse enter handler - creates initial ripple when entering
      const handleMouseEnter = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dropAt(x, y, 1200 * intensity); // Stronger initial ripple
      };

      // Random drops for ambient effect
      const randomDropInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          dropAt(
            Math.random() * width,
            Math.random() * height,
            300 * intensity
          );
        }
      }, 800);

      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        clearInterval(randomDropInterval);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        touchAction: "none",
        pointerEvents: "auto",
        zIndex: 1,
      }}
    />
  );
};

export default WaterRipple;
