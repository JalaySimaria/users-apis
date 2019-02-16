/**
 * @fileoverview This file will start the server.
 *
 * Once connection to MongoDB has been established, index.js will call startServer function
 * with PORT number and this function will start the server.
 *
 * @author Jalay Simaria
 */

// Setting default NODE_ENV to dev if not provided
const NODE_ENV = process.env.NODE_ENV || "dev";

// new jwtSecret every time server restarts
// thus, every time new jwt will be provided
// but static secret and jwt for test and prod env
global.jwtSecret =
  NODE_ENV === "dev"
    ? require("uuid/v4")()
    : "static-secret-for-test-and-prod-env";

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

// api routes for /v1
const v1Router = require("./routes/v1");

module.exports.startServer = port => {
  // no need to log APIs when testing
  if (NODE_ENV !== "test") {
    app.use(morgan("combined"));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );

  app.use(helmet()); // securing APIs
  app.use(cors()); // enabling CORS

  app.use("/v1", v1Router); // attached router to this endpoint

  // 404 page for all the unsupported routes
  app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
  });

  app.listen(port, () => {
    // no need for logs while testing
    if (NODE_ENV !== "test") {
      console.log(`Listening on port ${port}`);
      console.log("---------------");
      console.log("your JWT for this session has been generated below:");
      console.log(jwt.sign({ role: "temp" }, global.jwtSecret));
      console.log("---------------");
    }
  });
};

module.exports.server = app; // expoorting for testing
