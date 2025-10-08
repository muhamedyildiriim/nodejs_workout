// Node's new error format

function loadConfig() {
  throw new Error("File not found");
}

// Way 1
try {
  loadConfig();
} catch (err) {
  throw new Error("Failed to initialize app", { cause: err });
}

// Way 2
try {
  loadConfig();
} catch (err) {
  const error = new Error("Failed to initialize app", { cause: err });
  console.error(error.message); // "Failed to initialize app"
  console.error("Cause:", error.cause.message); // "File not found"
}

// Way 3
class AppError extends Error {
  constructor(message, cause) {
    super(message, { cause });
    this.name = "AppError";
  }
}

try {
  loadConfig();
} catch (err) {
  throw new AppError("Failed to initialize app", err);
}