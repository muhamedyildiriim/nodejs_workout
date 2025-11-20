/**
 * File: /03-api-architectures/05-template-engines/01-ssr-server.js
 * Topic: API Architectures → Template Engines (Server-Side Rendering)
 * Purpose: Demonstrates how to serve dynamic HTML instead of JSON.
 *
 * Key Points:
 * - **SSR (Server-Side Rendering):** The server builds the HTML string
 * by combining a "Template" (EJS) with "Data" (Variables).
 * - **View Engine:** We configure Express to use 'ejs'.
 * - **res.render():** The method that compiles the template and sends HTML.
 * - **Use Cases:** Admin dashboards, transactional emails, SEO-heavy pages.
 *
 * Install: npm install express ejs
 * Run: 
 * 1. node src/03-api-architectures/05-template-engines/01-ssr-server.js
 * 2. Open http://localhost:3000 in your browser.
 */

import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Robust Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// --- 1. Configure the "View Engine" ---
// Tell Express to use EJS for rendering templates
app.set("view engine", "ejs");
// Tell Express where the template files are located
app.set("views", join(__dirname, "views"));

// --- 2. The Route Handler ---
app.get("/", (req, res) => {
  // Simulated Data (normally from a Database)
  const mockData = {
    pageTitle: "Architect's Dashboard",
    user: { name: "Senior Engineer", role: "Admin" },
    tasks: ["Learn Node.js Core", "Master Async Patterns", "Build Scalable APIs"],
  };

  console.log("Rendering HTML for user:", mockData.user.name);

  // --- 3. The "Render" Step ---
  // Instead of `res.json()`, we use `res.render()`.
  // Express looks for 'index.ejs' in the 'views' folder,
  // injects `mockData`, converts it to HTML, and sends it.
  res.render("partials/index", mockData);
});

app.get("/about", (req, res) => {
  res.send("This is a plain text response (not a template).");
});

app.listen(PORT, () => {
  console.log(`SSR Server running at http://localhost:${PORT}`);
});