/**
 * File: /04-advanced-patterns-and-scaling/06-testing/01-unit.test.js
 * Topic: Testing → Unit Testing (Jest)
 * Purpose: Demonstrates how to test individual functions in isolation.
 *
 * Key Concepts:
 * - `describe`: Groups related tests together.
 * - `it` (or `test`): Defines a single test case.
 * - `expect`: The assertion library (e.g., expect(x).toBe(y)).
 * - Edge Cases: Testing limits (negative numbers, invalid inputs).
 *
 * Run: npx jest src/04-advanced-patterns-and-scaling/06-testing/01-unit.test.js
 */

import { add, calculateDiscount } from "./utils/math.js";

describe("Math Utils (Unit Tests)", () => {
  
  describe("add()", () => {
    it("should correctly add two positive numbers", () => {
      const result = add(2, 3);
      expect(result).toBe(5);
    });

    it("should handle negative numbers", () => {
      const result = add(-5, -10);
      expect(result).toBe(-15);
    });

    it("should throw an error if inputs are not numbers", () => {
      // When testing errors, wrap the call in a function
      expect(() => add("2", 3)).toThrow("Inputs must be numbers");
    });
  });

  describe("calculateDiscount()", () => {
    it("should apply the discount percentage correctly", () => {
      const price = 100;
      const discount = 20;
      const finalPrice = calculateDiscount(price, discount);
      expect(finalPrice).toBe(80);
    });

    it("should return 0 if the price is negative", () => {
      expect(calculateDiscount(-50, 10)).toBe(0);
    });
  });

});