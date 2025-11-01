/**
 * Topic: Module Pattern → Controller + Service + Repository
 * Purpose: Compact, layered design with validation and in-memory persistence.
 * Highlights:
 *  - Zod schema validation
 *  - In-memory async repo
 *  - Thin controller orchestration
 */

import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const usersRepo = (() => {
  const store = new Map(); // id → user
  let idSeq = 1;
  return {
    async list() {
      return Array.from(store.values());
    },
    async create({ email, name }) {
      const id = String(idSeq++);
      const now = new Date().toISOString();
      const user = { id, email, name, createdAt: now };
      store.set(id, user);
      return user;
    },
    async get(id) {
      return store.get(id) || null;
    },
  };
})();

const usersService = {
  async createUser(input) {
    const all = await usersRepo.list();
    if (all.some((u) => u.email === input.email)) {
      const err = new Error("Email already in use");
      err.statusCode = 409;
      err.code = "EMAIL_TAKEN";
      throw err;
    }
    return usersRepo.create(input);
  },
};

const usersController = {
  list: async (_req, res) => {
    const data = await usersRepo.list();
    res.json({ data });
  },
  create: async (req, res) => {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      const err = new Error("Validation failed");
      err.statusCode = 400;
      err.code = "VALIDATION_ERROR";
      err.details = parsed.error.flatten();
      throw err;
    }
    const user = await usersService.createUser(parsed.data);
    res.status(201).json({ data: user });
  },
};

export { usersController };