import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "errorhandler";
import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import fileUpload from "express-fileupload";

export const app = express();

app.use(compression());
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("dist"));
app.use("/api/v1/", router);

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

