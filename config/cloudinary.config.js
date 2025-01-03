const cloudinary = require('cloudinary').v2;


const cloudinaryconnect = ()=>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.API_SECRET,
        })
        console.log('cloudinary connected successfully');
        
    } catch (error) {
         console.log(error);
         
    }
}
module.exports = cloudinaryconnect