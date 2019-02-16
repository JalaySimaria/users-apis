/**
 * @fileoverview Root file which will be executed to start the server.
 *
 * This file will try to connect to the remote MongoDB.
 * If success, proceed to starting the server.
 * Else throw an error
 *
 * @author Jalay Simaria
 */

const mongoose = require("mongoose");

function initDBConnection(done) {
  const config = require(`./config/config-${process.env.NODE_ENV ||
    "dev"}.json`);
  const { HOST, DB, USERNAME, PASSWORD } = config.MONGO;
  const { startServer } = require("./server");

  mongoose.connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/${DB}`,
    {
      useNewUrlParser: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000
    },
    err => {
      if (err) {
        console.log("Connection to the DB failed. See below:");
        console.log(JSON.stringify(err, null, "\t"));
        process.exit(1);
      } else {
        startServer(config.SERVER.PORT);
        if (done) done(); // for testing
      }
    }
  );
}

if (process.env.NODE_ENV !== "test") initDBConnection();

module.exports = initDBConnection; // exporting for testing
