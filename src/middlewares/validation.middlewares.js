import { z } from "zod";
import { userIdSchema } from "../schema/user.schema.js";

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    return res.status(400).json({ error: error.message });
  }
};

const validateUserId = (req, res, next) => {
  try {
    userIdSchema.parse(req.params); // valida req.params.id com o schema
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    return res.status(400).json({ error: error.message });
  }
};

export { validate, validateUserId };
