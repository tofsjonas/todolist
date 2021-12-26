import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

// const dotenv = require('dotenv');
dotenv.config();
// import logger from "morgan";
import fs from "fs";
import path from "path";
// const fs = require('fs')
// var path = require('path')

import listRouter from "./routes/listRouter";
import indexRouter from "./routes/indexRouter";
// import usersRouter from './routes/users'

import mongoose from "mongoose";

const connection_string = "mongodb://localhost:27017/todolist";

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);

    // console.log(err.message);
  });

var app = express();

// const allowed_origins =
//   process.env.CORS_ALLOWED_ORIGINS || "http://localhost:3000";
//   const allowedOrigins = allowed_origins.split(",");

const allowedOrigins = [
  "http://localhost:3003",
  "http://127.0.0.1:3003",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://todolist.local",
  "https://todolist.earendel.se",
];

// app.use(cors({
//     origin: allowedOrigins
// }));
app.use(
  cors({
    origin: allowedOrigins,
  })
);
// app.use(function (req, res, next) {
//   var origin = req.headers.origin;
//   if (allowedOrigins.indexOf(origin) > -1) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", true);

//   return next();
// });

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/backend", listRouter);

app.use(express.static(join(__dirname, "public")));
var absolutePath = path.resolve("../frontend/build");
// app.use("/*", express.static(absolutePath));

app.use(express.static(absolutePath));

app.get("/*", function (req, res) {
  res.sendFile(path.join(absolutePath, "index.html"));
});

// app.use('/static', express.static('public'))

// console.log(absolutePath);
// try {
//   if (fs.existsSync(absolutePath)) {
//     // console.log("SPACETAG: app.js", "aha!");
//     app.use("/todolist", express.static(absolutePath));
//     // app.use(express.static(absolutePath))
//     app.get("/*", function (req, res) {
//       res.sendFile(path.join(absolutePath, "index.html"));
//     });
//   } else {
//     app.use("/", indexRouter);
//   }
// } catch (err) {
//   console.error(err);
// }

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // console.log('SPACETAG: app.js', 'ERROR')
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
