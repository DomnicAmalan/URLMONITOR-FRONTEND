const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/add-user", userController.create);
router.post("/authenticate", userController.createJWTToken);
router.get("/test", (req, res) => {console.log("iii"), res.send("hi")});
router.post("/check-user", userController.findOne);

module.exports = router;