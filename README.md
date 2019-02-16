# Users-APIs

### Description

---

This project demonstrates 2 API endpoints as mentioned below

- /v1/users GET
- /v1/users POST

Both of them are private APIs. Not accessible without passing a valid JWT token in `Authorization` header.

> How to get a token? Check [**Generating JWT Token**](#generating-jwt-token) below

> You can find API documentation within the project. Check [**Application Structure**](#application-structure) below for more info.

### NPM Packages Used

---

- [body-parser](https://www.npmjs.com/package/body-parser) - Parsing incoming request bodies
- [cors](https://www.npmjs.com/package/cors) - Enable CORS
- [express](https://www.npmjs.com/package/express) - Creating REST APIs
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - To limit repeated requests
- [helmet](https://www.npmjs.com/package/helmet) - Securing app by setting HTTP headers
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT based API authentication
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool
- [morgan](https://www.npmjs.com/package/morgan) - Request logger middleware

Dev dependencies

- [chai](https://www.npmjs.com/package/chai) - Assertion library
- [chai-http](https://www.npmjs.com/package/chai-http) - HTTP integration testing with Chai assetions
- [mocha](https://www.npmjs.com/package/mocha) - Async testing environment provider
- [uuid](https://www.npmjs.com/package/uuid) - Fast UUIDs generator

### NOTE

---

> I have configured a MongoDB clustor on cloud, thus, you don't need to start your local MongoDB and do some configuration.

This project contains 3 environments. Each of them requires a different PORT. Thus, please make sure you free those PORTs before starting the server

- prod - 8080
- dev - 8081
- test - 8082

In case if you're not comfortable freeing those PORTs, you can navigate to `config` (check [**Application Structure**](#application-structure) below for more info) directory and change the PORT in the respective file.

### Prerequisites

---

- Install NodeJS `Version > 8`
- Install latest version of Visual Studio Code
- Install latest version of Yarn [Installation | Yarn](https://yarnpkg.com/lang/en/docs/install/)

### Visual Studio code setup

---

> Install below mentioned VSCode extensions:

- Swagger Viewer

### Application Structure

---

    ├── package.json                    # root package.json
    ├── README.md
    ├── src                             # directory contains code
    │   ├── config                      # config json files for each NODE_ENV
    │   │   ├── config-dev.json         # use if NODE_ENV === dev
    │   │   ├── config-prod.json        # use if NODE_ENV === prod
    │   │   └── config-test.json        # use if NODE_ENV === test
    │   ├── index.js                    # starting point of server
    │   ├── models                      # directory contains mongodb schemas
    │   │   └── users.js
    │   ├── routes                      # directory containins API routes based in version
    │   │   └── v1                      # /v1 routes in this directory
    │   │       ├── api-docs            # swagger documentation for /v1, use VSCode extension to view
    │   │       │   └── users.json
    │   │       ├── controllers         # API request handlers in this directory
    │   │       │   └── users.js
    │   │       ├── index.js            # endpoint to router mapped in this file
    │   │       └── utils               # utilitiy function in directory
    │   │           └── middlewares.js
    │   ├── server.js                   # once db connected, server is done here
    │   └── test                        # mocha/chai test cases written in here
    │       └── users.js
    └── yarn.lock

### Install dependencies

---

```npm
$ npm install or yarn install
```

### Instructions for starting the server

---

The command must be executed from the **root directory**

For running the application in **prod** env

```shell
$ npm start or yarn start
```

For running the application in **dev** env

```shell
$ npm start:dev or yarn start:dev
```

### Generating JWT Token

---

The moment you successfully start the server, the application will provide you a JWT token valid until the server is restarted.

Meaning, every time you start the server, you'll get a new JWT and old one will expire.

You should see something like this on server start:

```
$ yarn start

Listening on port 8080
---------------
your JWT for this session has been generated below:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVtcCIsImlhdCI6MTU1MDMwNzkxNX0.k3DNRpsGMeZJA8-srom3UrSqKKA6Eo0qnX8wgaxyt0U
---------------
```

> **NOTE**: This every time new JWT mechanism is used only for dev env. A never expiring JWT has been hardcoded for test env.

### Testing APIs

---

```shell
$ npm test or yarn test
```

On successfully executing the above-mentioned command, you should see something like this:

```shell
$ yarn test

  Users
    invalid URL check
      ✓ it should throw 404 Page not found with unsupported URL
    POST user
      ✓ it should throw 403 Forbidden when not passing token
      ✓ it should throw 401 Unauthorized when passing invalid token
      ✓ it should not POST a user without required fields
      ✓ it should POST a user (46ms)
    GET users
      ✓ it should throw 403 Forbidden when not passing token
      ✓ it should throw 401 Unauthorized when passing invalid token
      ✓ it should GET all the users(POST will create 1 so 1 in this case) (42ms)

Done in 1.27s.
```

### TODO

---

- [joi](https://www.npmjs.com/package/joi) - Object schema description language

---

Thank you.
