import { mongo_url } from "./config/index.config";
import Express, { Application, urlencoded } from "express";
import cors from "cors";
import notFound from "./middlewares/notFound.middleware";
import mongoose from "mongoose";
import bookRoute from "./routes/book.route";
import { emitWarning } from "process";

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
      console.log("✅ connected mongoDB")
    );
  }

  private middlewaresInput() {
    this.app.use(cors());
    this.app.use(urlencoded({ extended: true }));
  }

  private routes() {
    this.app.use("/addbook", (req, res) => {
      res.sendFile(__dirname + "/views/addBook.html");
    });
    this.app.use("/addchapter", (req, res) => {
      res.sendFile(__dirname + "/views/addChapter.html");
    });
    this.app.use("/api/books", bookRoute);
  }

  private middlewaresOutput() {
    this.app.use(notFound);
  }

  public start() {
    this.app.listen(this.port, () => console.log(`✅ server is running on http://localhost:${this.port}/`));
  }
}
