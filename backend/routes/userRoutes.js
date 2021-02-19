const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/add-user", userController.create);
router.post("/check-user", userController.findOne);
router.post("/authenticate", userController.createJWTToken);

module.exports = router;