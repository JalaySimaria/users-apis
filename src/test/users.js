/**
 * @fileoverview This file contains all the unit test cases for /v1/users route.
 *
 * @author Jalay Simaria
 */

const mongoose = require("mongoose");
const Users = require("../models/users");

const chai = require("chai");
const chaiHttp = require("chai-http");
const initDBConnection = require("../index");
const { server } = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  before(done => {
    // init the db connection
    // if something goes wrong, testing won't proceed
    initDBConnection(done);
  });

  after(done => {
    // After testing is done, we empty the database and close the connection
    Users.deleteMany({}, err => {
      mongoose.connection.close(done);
      done();
      process.exit(0);
    });
  });

  describe("invalid URL check", () => {
    it("it should throw 404 Page not found with unsupported URL", done => {
      chai
        .request(server)
        .get("/unsupported-url")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("POST user", () => {
    it("it should throw 403 Forbidden when not passing token", done => {
      chai
        .request(server)
        .post("/v1/users")
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should throw 401 Unauthorized when passing invalid token", done => {
      chai
        .request(server)
        .post("/v1/users")
        .set("Authorization", "invalid token")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should not POST a user without required fields", done => {
      chai
        .request(server)
        .post("/v1/users")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVtcCIsImlhdCI6MTU1MDI1MjU2OH0.szHwHHPhKDqnlghEnAKJ2Wl7qedGiwettKNoRkMTe2s"
        )
        .send({
          firstName: "first name",
          lastName: "last name",
          age: 18
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should POST a user", done => {
      chai
        .request(server)
        .post("/v1/users")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVtcCIsImlhdCI6MTU1MDI1MjU2OH0.szHwHHPhKDqnlghEnAKJ2Wl7qedGiwettKNoRkMTe2s"
        )
        .send({
          firstName: "first name",
          lastName: "last name",
          email: "email@gmail.com",
          age: 18
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("GET users", () => {
    it("it should throw 403 Forbidden when not passing token", done => {
      chai
        .request(server)
        .get("/v1/users")
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should throw 401 Unauthorized when passing invalid token", done => {
      chai
        .request(server)
        .get("/v1/users")
        .set("Authorization", "invalid token")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should GET all the users(POST will create 1 so 1 in this case)", done => {
      chai
        .request(server)
        .get("/v1/users")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVtcCIsImlhdCI6MTU1MDI1MjU2OH0.szHwHHPhKDqnlghEnAKJ2Wl7qedGiwettKNoRkMTe2s"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.users.length.should.be.eql(1);
          done();
        });
    });
  });
});
