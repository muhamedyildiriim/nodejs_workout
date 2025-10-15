/**
 * Topic: Async Programming → Performance & Workers → Event Loop Delay
 * Purpose: Measures event loop latency to detect blocking synchronous operations.
 * Key Points:
 *  - Uses perf_hooks.monitorEventLoopDelay to quantify responsiveness
 *  - High delay indicates CPU-bound or synchronous work blocking async flow
 *  - Essential for observability, SLO tracking, and performance regression detection
 * Run: node src/04-async-programming/10-performance-and-workers/02-event-loop-delay.js
 * Expected:
 *  - Prints delay metrics (mean, p95, max) in milliseconds every second
 *  - Spikes appear when simulated blocking occurs
 */

import { monitorEventLoopDelay } from "node:perf_hooks";

const h = monitorEventLoopDelay({ resolution: 10 });
h.enable();

setInterval(() => {
  console.log(
    JSON.stringify({
      mean: Math.round(h.mean / 1e6),
      p95: Math.round(h.percentile(95) / 1e6),
      max: Math.round(h.max / 1e6),
    })
  );
  h.reset();
}, 1000);

// Inject artificial blocking to simulate latency spikes
setInterval(() => {
  const start = Date.now();
  while (Date.now() - start < 80) {} // 80ms busy-loop to block the loop
}, 5000);

/*
Notes:
- Event loop delay reflects how long callbacks wait to be executed.
- monitorEventLoopDelay exposes mean, percentiles, and max latency.
- Use in production metrics to detect blocking operations or GC pauses.
- Alert on sustained high delay, not single spikes; analyze distributions.
- Real-world: trigger autoscaling or load shedding when latency exceeds thresholds.
*/