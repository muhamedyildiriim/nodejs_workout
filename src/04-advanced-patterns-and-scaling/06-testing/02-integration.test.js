/**
 * File: /04-advanced-patterns-and-scaling/06-testing/02-integration.test.js
 * Topic: Testing → Integration Testing (Supertest)
 * Purpose: Demonstrates testing API endpoints (HTTP requests) without
 * manually starting the server.
 *
 * Key Concepts:
 * - **Supertest:** Wraps the Express app to simulate HTTP requests.
 * - **Integration:** We are testing the route, the middleware, and the
 * logic flow together (not just one function).
 * - **Status Codes:** We verify 200, 201, 400 etc.
 *
 * Run: NODE_OPTIONS=--experimental-vm-modules npx jest src/04-advanced-patterns-and-scaling/06-testing/02-integration.test.js
 */

import request from "supertest";
import app from "./app.js";

describe("API Endpoints (Integration Tests)", () => {

  describe("GET /health", () => {
    it("should return 200 OK and status message", async () => {
      const response = await request(app).get("/health");
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ status: "ok" });
    });
  });

  describe("POST /users", () => {
    it("should create a user when valid data is sent", async () => {
      const payload = { username: "test_user" };
      
      const response = await request(app)
        .post("/users")
        .send(payload);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.username).toBe("test_user");
    });

    it("should return 400 Bad Request if username is missing", async () => {
      const response = await request(app)
        .post("/users")
        .send({}); // Empty body

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Username required");
    });
  });

});