/**
 * File: /04-advanced-patterns-and-scaling/06-testing/utils/math.js
 * Purpose: A simple utility module to demonstrate Unit Testing.
 */

export const add = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Inputs must be numbers");
  }
  return a + b;
};

export const calculateDiscount = (price, discountPercentage) => {
  if (price < 0) return 0;
  const discount = (price * discountPercentage) / 100;
  return price - discount;
};