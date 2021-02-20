const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = async(req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  const user = await User.create({
    email,
    password
  });
  res.json({
    user,
    message: "create user successfully"
  });
};

exports.findUser = async(req, res) => {
  const user = await User.findOne({email: req.body.email})
  if (!user) {
    return res.status(200).send(null);
  }
  else{
    return res.status(200).send(user)
  }
};

exports.createJWTToken = async(req, res) => {
  const checker = req.body.email
  const user = await User.findOne({email: checker});
  
  try{
    bcrypt.compareSync(checker, user.password);
    const token = jwt.sign({ user }, "yourSecretKey", {
      expiresIn: "24h"
    });   
    res.status(200).send({jwt: token})
  }
  catch(err){
    console.log(err.message)
  }
}