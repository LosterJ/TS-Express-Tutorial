import * as express from "express";
import { loggerMiddleware } from "./logging";
import { hostname } from "os";

const app = express();
const router = express.Router();

app.use(loggerMiddleware);
app.use("/api", router);

router.get("/helloo", (request, response) => {
  response.send("Hello world!");
});

router.get("/req-info", (request, response) => {
  response.send({
    hostname: request.hostname,
    path: request.path,
    method: request.method,
    header: request.headers,
    cookie: request.cookies,
    ip: request.ip,
    param: request.params,
    url: request.url,
  });
});

app.listen(5000);
console.log("Server now listen in localhost:5000");
