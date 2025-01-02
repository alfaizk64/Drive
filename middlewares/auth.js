const jwt = require('jsonwebtoken')
const secretKey = require('../config/authConfig')


const authenticatemiddleware = (req,res,next)=>{
      
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).send({ message: 'Token is not provided' });
        }
        
          const decoded = jwt.verify(token, secretKey)
                 if(!decoded){
                     return res.status(403).send({ message: 'Token is not valid' });
                 }
                 req.user = decoded;
               return  next()
    } catch (error) {
        res.status(500).send({ message:
            error.message
        });
    }
    
}
module.exports = authenticatemiddleware;