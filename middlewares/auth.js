const jwt = require('jsonwebtoken')
const secretKey = require('../config/authConfig')


const authenticatemiddleware = (req,res,next)=>{
      
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).redirect("/api/login")
            // .send({ message: 'Token is not provided' });    
        }
        
          const decoded = jwt.verify(token, secretKey)
                 if(!decoded){
                     return res.status(403).redirect("/api/login")
                    //  .send({ message: 'Token is not valid' });
                 }
                 req.user = decoded;
                  

                // Set headers to prevent browser caching
                res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                res.setHeader("Pragma", "no-cache");
                res.setHeader("Expires", "0");
               return  next()
    } catch (error) {
        console.log(error + " error from middleware");
        res.redirect('/api/error')
        // res.status(500).send({ 
        //     message: "Internal Server Error",
        //     error: error.message
        // });
    }
    
}
module.exports = authenticatemiddleware;