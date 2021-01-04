import { mongo_url } from "./config/index.config";
import Express, { Application, json, urlencoded } from "express";
import cors from "cors";
import notFound from "./middlewares/notFound.middleware";
import mongoose from "mongoose";
import bookRoute from "./routes/book.route";
import userRoute from "./routes/user.route";
import categoryRoute from "./routes/category.route";
import viewRoute from "./routes/view.route";

export default class Server {
  private app: Application;

  constructor(private port: number) {
    this.app = Express();
    this.settings();
    this.middlewaresInput();
    this.routes();
    this.middlewaresOutput();
  }

  private settings() {
    mongoose.connect(mongo_url, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
      console.log("✅ connected to mongoDB")
    );
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);

    this.app.set("view engine", "ejs");
    this.app.set("views", process.cwd() + "/src/views");
  }

  private middlewaresInput() {
    this.app.use(cors());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
  }

  private routes() {
    this.app.use("/api/book", bookRoute);
    this.app.use("/api/user", userRoute);
    this.app.use("/api/category", categoryRoute);
    this.app.use("/", viewRoute);
  }

  private middlewaresOutput() {
    this.app.use(notFound);
  }

  public start() {
    this.app.listen(this.port, () => console.log(`✅ server is running on http://localhost:${this.port}/`));
  }
}
