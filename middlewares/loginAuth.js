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

//   const registerauth = (req, res) => {
//     const token = req.cookies.token;
//     if (token) {
//       try {
//         jwt.verify(token, secretKey);
//         return res.redirect('/home');
//       } catch (err) {
//         // Token is invalid or expired
//         return res.clearCookie("token").render("register");
//       }
//     }
//     res.render('register');
//   }

//   const homeauth = (req, res) => {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.redirect('/login');
//     }
//     try {
//       jwt.verify(token, secretKey);
//       return res.render('home');
//     } catch (err) {
//       // Token is invalid or expired
//       return res.clearCookie("token").redirect('/login');
//     }
//   }
module.exports =loginauth