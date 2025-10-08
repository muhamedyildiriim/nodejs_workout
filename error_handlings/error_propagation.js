// ============================================
// ============ ERROR PROPAGATION =============
// ============================================

// Bubbling errors through multiple function levels

function levelThree() {
  throw new Error("Something broke in Level 3");
}

function levelTwo() {
  try {
    levelThree();
  } catch (err) {
    console.log("Level 2 caught and re-throws...");
    throw err; // Bubble up
  }
}

function levelOne() {
  try {
    levelTwo();
  } catch (err) {
    console.error("Final Catch:", err.message);
  }
}

levelOne();

// The error thrown in levelThree is caught and re-thrown upward until levelOne finally handles it.