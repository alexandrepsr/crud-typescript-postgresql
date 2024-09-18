import * as dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import User from "../model/User";
import Post from "../model/Post";
import Comment from "../model/Comment";

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.connectPostgreSQL();
  }

  private async connectPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
      models: [User, Post, Comment],
      logging: false,
    });

    this.sequelize
      .authenticate()
      .then(() => {
        console.log(__dirname + "../model");
        console.log("PostgreSQL connection has been established successfully");
      })
      .catch((err) => {
        console.log("Unable to connect to the postgresql database");
      });
  }
}

export default Database;
