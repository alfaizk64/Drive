const mongoose = require('mongoose');



const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3,"username must be at least 3 characters long"],
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: [true,"Email is already in use"],
            minlength: [13,"Email must be at least 2 characters long"]
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [8,"Password must be at least 8 characters long"],
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);
module.exports = User;
