import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const signUpValidation = () => {
  return [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ];
};

export const loginValidation = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please include a valid password").not().isEmpty(),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ errors: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};
