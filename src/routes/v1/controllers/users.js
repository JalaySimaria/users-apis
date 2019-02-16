/**
 * @fileoverview Request handlers for /users endpoint
 *
 * @author Jalay Simaria
 */

const Users = require("../../../models/users");

/*
 * GET /users route to retrieve all the users.
 */
function getUsers(req, res) {
  Users.find({}, { _id: 0, createdAt: 0, updatedAt: 0 }) // hiding unnecessary fields
    .sort({ createdAt: -1 }) // latest to oldest users
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong. Please try again later",
          err // TODO: remove for prod
        });
      }

      return res.status(200).json({
        message: "Users listed successfully!",
        users
      });
    });
}

/*
 * POST /users to save a new user.
 */
function postUser(req, res) {
  const newUser = new Users({ ...req.body });

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong. Please try again later",
        err // TODO: remove for prod
      });
    }

    return res.status(200).json({
      message: "User successfully added!"
      // user
    });
  });
}

module.exports = { getUsers, postUser };
