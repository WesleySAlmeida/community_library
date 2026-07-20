import { z } from "zod";
import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";
import { loanIdSchema } from "../schema/loan.schema.js";

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

const validateBookId = (req, res, next) => {
  try{
    bookIdSchema.parse(req.params);
    next();
  }catch (error){
    res.status(400).json({message: error.message})
  }
}

const validateLoanId = (req, res, next) => {
  try {
    loanIdSchema.parse({ loanId: +req.params.id }); // usar loanId
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    return res.status(400).json({ error: error.message });
  }
};

export { validate, validateUserId, validateBookId, validateLoanId };
