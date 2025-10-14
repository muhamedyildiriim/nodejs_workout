/**
 * Topic: Error Handling → Core Concepts → ValidationError
 * Purpose: Demonstrates how validation libraries like Joi or Zod throw structured errors when input fails validation rules.
 * Key Points:
 *  - ValidationError indicates invalid user or API input
 *  - Commonly returned as HTTP 400 (Bad Request) in REST APIs
 *  - Always provide clear, user-friendly error messages
 * Run: node src/03-error-handlings/01-core-concepts/validation-error.js   
 * (Node >= 20)
 * Expected:
 *  - Logs: "Validation Error: "username" is not allowed to be empty"
 */

import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().min(3).required(),
});

const { error } = schema.validate({ username: "" });

if (error) {
  console.error("Validation Error:", error.details[0].message);
}

// Notes:
// - Validation libraries like Joi, Yup, or Zod generate descriptive errors.
// - Use these errors to inform users of what failed and why.
// - Map validation errors to 400 Bad Request responses in production APIs.