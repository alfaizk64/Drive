const { body, validationResult } = require("express-validator");
const User = require("../Models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/authConfig");
const filesUpload = require('../Models/files.models')

const index_page = (req, res) => {
  res.render("index");
};
const register_page = (req, res) => {
  res.render("register");
};
const login_page = (req, res) => {
  res.render("login");
};

const register_user = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      username,
      email,
      password: hashedPassword,
    });
    user = await user.save();
     res.redirect('/api/login') 
    // res.status(200).send({
    //   message: "User registered successfully",      
    // });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
    console.log(" Error registering " + error.message);
  }
};

const login_user = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Email or password is incorrect" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    let payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    let token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    res.cookie("token", token);
   
     res.redirect('/home')
    // res.status(200).send({
    //   message: "User logged in successfully",
    // });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: error.message,
    });
  }
};

const logout_user = (req, res) => {
  res.clearCookie("token");
  res.redirect("/api/login");
};

module.exports = {
  register_user,
  register_page,
  index_page,
  login_page,
  login_user,
  logout_user
};
