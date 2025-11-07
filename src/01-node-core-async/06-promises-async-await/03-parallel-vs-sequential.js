/**
 * File: /01-node-core-async/06-promises-async-await/03-parallel-vs-sequential.js
 * (PHASE 3: MASTERY REFACTOR v3)
 * Topic: Promises → Parallel vs. Sequential (The "Performance" Proof)
 * Purpose: This is the "Mastery Demo" that *proves* the critical
 * performance difference between Sequential `await` vs. Parallel `Promise.all`.
 * Key Points:
 * - `runBasicPromiseDemo` shows the modern `try...catch` syntax.
 * - `runPromiseUseCases` (the main demo) shows the "Architect's Way" (Parallel)
 * vs. the "Bad Architecture" (Sequential) using simulated I/O.
 * Run: node src/01-node-core-async/06-promises-async-await/03-parallel-vs-sequential.js
 * Expected:
 * - "Parallel_Time" (e.g., ~1.5s) will be *dramatically* faster than
 * "Sequential_Time" (e.g., ~3s).
 */

// --- TOOL 1: Basic Promise (Refactored) ---
export async function runBasicPromiseDemo() {
  console.log("Basic Demo: Start");
  const promise = new Promise((resolve, reject) => {
    let isDone = true;
    if (isDone) {
      resolve("Basic Demo: Task completed");
    } else {
      reject("Basic Demo: Something went wrong");
    }
  });

  // "Architect's View" on Error Handling:
  // We use `try...catch` instead of `.then().catch()`.
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// --- TOOL 2: "Architect's View" on Promises (Performance) ---

// 3 different async I/O tasks:
function prepareIngredients() {
  return new Promise((resolve) => {
    console.log("Preparing ingredients (1s)... (Simulates I/O #1)");
    setTimeout(() => resolve("Ingredients ready"), 1000);
  });
}

function preheatOven() {
  return new Promise((resolve) => {
    console.log("Pre-heating oven (1.5s)... (Simulates I/O #2)");
    setTimeout(() => resolve("Oven ready"), 1500);
  });
}

function cookMeal() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Sequential (Bad): Meal cooked (2s)"), 2000);
  });
}

function setTable() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Sequential (Bad): Table set (1s)"), 1000);
  });
}

/**
 * This is the "Mastery Code" function.
 * It compares parallel vs. sequential async execution.
 */
export async function runPromiseUseCases() {
  console.log("\nArchitect's Demo: Start (Comparing Parallel vs. Sequential I/O)");
  console.time("Architects_Demo_Total_Time"); // Start a timer

  // --- THE ARCHITECT'S WAY: PARALLEL (Promise.all) ---
  // The main thread dispatches two I/O tasks *at the same time*.
  // Total time = the time of the *slowest* task (1.5s).
  console.time("Parallel_Time (Good)");
  try {
    const [ingredients, oven] = await Promise.all([
      prepareIngredients(),
      preheatOven(),
    ]);
    console.log(
      `--- All preparations are done in parallel! (${ingredients}, ${oven}) ---`
    );
  } catch (err) {
    console.error("Parallel tasks failed:", err);
  }
  console.timeEnd("Parallel_Time (Good)"); // Will show ~1500ms

  // --- THE "BAD ARCHITECTURE" WAY: SEQUENTIAL (Awaiting in series) ---
  // The main thread waits for the meal to cook (2s)...
  // *Then* it starts to set the table (1s).
  // Total time = 2s + 1s = 3s. (A performance disaster).
  console.time("Sequential_Time (Bad)");
  try {
    const meal = await cookMeal();
    console.log(meal);

    const table = await setTable();
    console.log(table);

    console.log("--- Bad sequential tasks finished ---");
  } catch (err) {
    console.error("Sequential tasks failed:", err);
  }
  console.timeEnd("Sequential_Time (Bad)"); // Will show ~3000ms

  console.timeEnd("Architects_Demo_Total_Time");
}

// Guard to run this file directly
// --- ARCHITECT'S FIX: Updated file guard path ---
if (process.argv[1]?.endsWith("03-parallel-vs-sequential.js")) {
  (async () => {
    await runBasicPromiseDemo();
    await runPromiseUseCases();
  })();
}