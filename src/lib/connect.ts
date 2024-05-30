import { Sequelize } from "sequelize-typescript";

import {
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
} from "../constants/global.constants";

export default class PostgresService {
  public readonly connection: Sequelize;
  // public readonly isAuthenticated;
  constructor(
    database = DB_DATABASE,
    user = DB_USER,
    password = DB_PASSWORD,
    host = DB_HOST,
    port = 5432
  ) {
    this.connection = new Sequelize({
      database,
      host,
      port,
      dialect: "postgres",
      username: user,
      password,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      omitNull: true,
      modelPaths: [`${__dirname}/../models`],
      modelMatch: (filename, member) => {
        return (
          filename.substring(0, filename.indexOf(".model")) ===
          member.toLowerCase()
        );
      },
    });
  }

  public isAuthenticated = async () => {
    return new Promise((resolve, reject) => {
      this.connection
        .authenticate()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
