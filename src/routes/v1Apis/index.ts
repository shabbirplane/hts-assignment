import express from "express";
import { AuthRouter } from "./auth";

export class APISRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.use("/v1", new AuthRouter().router);
  }
}
