import PostgresService from "./lib/connect";
import cors from "cors";
import express, { Application } from "express";
import http from "http";
import { PORT } from "./constants/global.constants";
import { IndexRouter } from "./routes";
import { errorHandler } from "./utils/appError";

export default class HTSAssignment {
  public app: Application;
  public port: number;
  public server: http.Server;

  constructor(port = PORT) {
    this.app = express();
    this.port = this.normalizePort(port);
    this.server = http.createServer(this.app); // Initialize HTTP server here
  }

  public configureApp = (): Promise<Application> => {
    this.app.set("port", this.port);
    const indexRouter = new IndexRouter();
    const options: cors.CorsOptions = {
      origin: "*",
    };
    this.app.use(cors(options));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use("/", indexRouter.getRouter());
    this.app.use(errorHandler);
    return Promise.resolve(this.app);
  };

  public normalizePort = (val: string) => {
    const portNumber = parseInt(val, 10);
    return portNumber;
  };

  private onError = (error: any) => {
    if (error.syscall !== "listen") {
      throw error;
    }
  };

  private _startListen = (): Promise<http.Server> => {
    return new Promise((resolve, reject): void => {
      try {
        const Postgres = new PostgresService();
        Postgres.isAuthenticated()
          .then(() => {
            console.info(`Authenticated successfully!`);
          })
          .catch((error) => {
            console.error(
              `Error occurred while authenticating the database: ${error}`
            );
          });

        Postgres.connection
          .sync({ alter: false })
          .then(() => {
            console.info(`Database connected!`);
          })
          .catch((error) => {
            console.error(`Unable to connect to database: ${error}`);
          });

        this.configureApp()
          .then(() => {
            this.server.on("error", this.onError);
            this.server.listen(this.port, () => {
              console.info(`Server is running on port ${this.port}`);
              resolve(this.server);
            });
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  };

  public start = (): Promise<http.Server> => {
    return new Promise((resolve, reject) => {
      this._startListen()
        .then((server) => {
          resolve(server);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };
}
