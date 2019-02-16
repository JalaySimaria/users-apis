/**
 * @fileoverview Root file where controller will be attached to respective routes.
 *
 * @author Jalay Simaria
 */

const express = require("express");
const router = express();

const { getUsers, postUser } = require("./controllers/users");
const { validateJWT } = require("./utils/middlewares");

router
  .route("/users")
  .get(validateJWT, getUsers)
  .post(validateJWT, postUser);

module.exports = router;
