const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { withJWTAuthMiddleware } = require("express-kun");

const protectedRoute = withJWTAuthMiddleware(router, "yourSecretKey")

protectedRoute.post("/find-user", userController.findUser)

module.exports = protectedRoute;