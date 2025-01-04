const secretKey = require("../config/authConfig");
const jwt = require("jsonwebtoken")

const loginauth = (req, res) => {
    const token = req.cookies.token;
    if (token) {
      try {
        jwt.verify(token, secretKey);
        return res.redirect('/home');
      } catch (err) {    
        // Token is invalid or expired
        return res.clearCookie("token").render("login");
      }
    }
    res.render('login');
  }


module.exports =loginauth