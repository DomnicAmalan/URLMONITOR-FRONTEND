const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = async(req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }

  const user = new User({
    email: req.body.email,
  });

  const checkUser = await User.findOne({
    email: req.body.email
  });
  if(!checkUser){
    res.send(data)
  }
  else{
    user
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.email,
        });
    });
  }
  
};

exports.findOne = (req, res) => {
  User.findOne({email: req.body.email})
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.body.email,
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      
      return res.status(500).send({
        message: "Error retrieving user with id " + req.body.email,
      });
    });
};

exports.createJWTToken = async(req, res) => {
  const checker = req.body.email
  const user = await User.findOne({email: checker});
  if (bcrypt.compareSync(checker, "amalandomnic@gmail.com")) {
    console.log("iiii")
    const token = jwt.sign({ user }, "yourSecretKey", {
      expiresIn: "24h"
    });
    console.log(token)
    res.json({
      user,
      token,
      message: "create user successfully"
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
}