// ============================================
// ==== CUSTOM ERROR (Your Own Error Type) ====
// ============================================

// You can define your own error class.
// For example, if user input is missing, it’s an application error, not a system error.
// Define your own error classes for clearer debugging.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

function checkUser(name) {
  if (!name) throw new AppError("Kullanıcı adı zorunlu", 400);
  console.log("Hoş geldin", name);
}

try {
  checkUser(""); // throws an error
} catch (err) {
  if (err instanceof AppError) {
    console.log("AppError:", err.message, err.statusCode);
  } else {
    console.log("Bilinmeyen hata:", err.message);
  }
}
// By defining your own error class, you can mark which errors are “expected”.
/*
  How to handle:
    - Use descriptive error names
    - Handle them with specific instanceof checks
*/



class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid email address");
} catch (err) {
  console.error(err.name + ":", err.message);
}