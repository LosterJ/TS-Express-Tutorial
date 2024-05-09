import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import "dotenv/config";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public app: express.Application;
  // public port: number;

  constructor(controllers) {
    this.app = express();
    // this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private connectToTheDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose
      .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}/${MONGO_PATH}`)
      .then(() => console.log("connection successful"))
      .catch((err) => console.log(err));
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;
