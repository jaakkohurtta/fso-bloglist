const config = require("./server/utils/config");
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./server/utils/logger");
const middleware = require("./server/utils/middleware");
const blogsRouter = require("./server/controllers/blogs");
const usersRouter = require("./server/controllers/users");
const loginRouter = require("./server/controllers/login");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to Mongo DB");
  })
  .catch((error) => {
    logger.error("connection to Mongo DB failed:", error.message);
  });

app.use(express.static("build"));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "test") {
  app.use(favicon(path.join(__dirname, "assets", "favicon.ico")));
}

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.get("/version", (req, res) => {
  res.send("v1.0.0");
});

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./server/controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
