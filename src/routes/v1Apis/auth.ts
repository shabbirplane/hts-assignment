import AuthController from "../../controller/auth.controller";
import { Router } from "express";

import {
  signUpValidation,
  loginValidation,
  validate,
} from "../../middleware/userValidation.middleware";

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    const authController = new AuthController();
    this.router.post(
      "/signup",
      signUpValidation(),
      validate,
      authController.signUp
    );
    this.router.post(
      "/login",
      loginValidation(),
      validate,
      authController.login
    );
  }
}
