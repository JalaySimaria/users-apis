/**
 * @fileoverview Users collection schema definition.
 *
 * @author Jalay Simaria
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// Users schema definition
let UsersSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("user", UsersSchema);
