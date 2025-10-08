// ============================================
// ============= VALIDATION ERROR =============
// ============================================

// Errors from validation libraries like Joi / Zod / Yup

import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().min(3).required(),
});

const { error } = schema.validate({ username: "" });

if (error) {
  console.error("Validation Error:", error.details[0].message);
}

// Libraries like Joi, Yup, or Zod throw descriptive validation errors, usually mapped to 400 Bad Request.