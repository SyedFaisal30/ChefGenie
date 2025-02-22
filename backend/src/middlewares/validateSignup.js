import { signUpSchema } from "../schemas/signupSchema.js";

export const validateSignup = (req, res, next) => {
  const validationResult = signUpSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }
  next();
};
