import rateLimit from "express-rate-limit";

/**
 * Rate limiter middleware factory
 * @param {Object} options - Rate limiter options
 * @returns {Function} Express middleware
 */
export const rateLimiter = (options = {}) => {
  const defaultOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Store in memory (for production, consider Redis)
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message:
          options.message ||
          "Too many requests from this IP, please try again later.",
      });
    },
  };

  return rateLimit({ ...defaultOptions, ...options });
};

// Common rate limiters for different use cases

// Strict rate limiter for public endpoints (5 requests per 15 minutes)
export const strictRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests. Please try again after 15 minutes.",
});

// Standard rate limiter for API endpoints (100 requests per 15 minutes)
export const standardRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Auth rate limiter for login attempts (5 attempts per 15 minutes)
export const authRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many login attempts from this IP. Please try again after 15 minutes.",
  skipSuccessfulRequests: true, // Don't count successful logins
});
