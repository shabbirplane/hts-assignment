import * as express from "express";
import { APISRouter } from "./v1Apis";

export class IndexRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private setRoutes() {
    this.router.use("/apis", new APISRouter().router);
  }
}
