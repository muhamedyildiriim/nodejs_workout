/**
 * Topic: Async Programming → Real-world Scenarios → External API Calls
 * Purpose: Demonstrates handling async HTTP requests and network errors using async/await with robust try/catch logic.
 * Key Points:
 *  - Use async/await for clean flow and clear error boundaries
 *  - Validate HTTP status codes before parsing JSON
 *  - Handle transient network issues gracefully with retries/backoff (for production)
 * Run: node src/04-async-programming/12-realworld-projects/02-weather-fetcher/weather-fetcher.js
 * Expected:
 *  - Logs a successful API call with parsed weather data or a detailed error message if the request fails
 */

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=40.97&longitude=29.06&current_weather=true";

async function getWeather() {
  try {
    console.log("🌦️ Fetching current weather data...");
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    console.log("Current Weather:", data.current_weather);
  } catch (err) {
    console.error("Failed to fetch weather data:", err.message);
  }
}

getWeather();