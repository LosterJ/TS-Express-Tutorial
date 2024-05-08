import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import "dotenv/config";

class App {
  public app: express.Application;
  // public port: number;

  constructor(controllers) {
    this.app = express();
    // this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
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

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;
