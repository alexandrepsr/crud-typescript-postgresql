import express, { Application, Request, Response } from "express";
import Database from "./src/config/database";
import UserRouter from "./src/router/UserRouter";
import PostRouter from "./src/router/PostRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/health").get((req: Request, res: Response) => {
      res.json({ message: "status ok" });
    });
    this.app.use("/api/v1/user", UserRouter);
    this.app.use("/api/v1/post", PostRouter);
  }
}

const port: number = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log("Server started");
});
