/**
 * Topic: Configuration → ENV-First Setup
 * Purpose: Centralize and type-safe environment configuration.
 * Highlights:
 *  - Environment-driven config
 *  - Defaults and numeric parsing
 */

const cfg = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3001", 10),
  requestLog: process.env.REQUEST_LOG !== "false",
  rate: {
    windowMs: 60 * 1000, // 1 min
    max: parseInt(process.env.RATE_LIMIT_MAX || "60", 10),
  },
};

export default cfg;