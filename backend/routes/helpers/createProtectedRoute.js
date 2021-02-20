const { withJWTAuthMiddleware } = require("express-kun"); 
const express = require("express");
const router = express.Router();

module.exports = function() {
  return withJWTAuthMiddleware(router, 'yourSecretKey');
};