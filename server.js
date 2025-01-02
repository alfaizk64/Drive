const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT || 3000
const userRouter = require('./Routes/user.routes')
const dbConnect = require('./config/dbConnect')
const cookieParser = require('cookie-parser')
const indexRouter = require('./Routes/index.routes')
const fileUpload = require('express-fileupload')
const cloudinaryconnect = require('./config/cloudinary.config')

// Middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload())
app.set('view engine', 'ejs');

// cloudinary connect
cloudinaryconnect()


// Routes
app.use('/api', userRouter)
app.use('/', indexRouter)


app.listen(port,(req, res) => {
    console.log(`Server is running on port ${port}`);
});