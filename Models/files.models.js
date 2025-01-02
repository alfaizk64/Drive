const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { 
    type: String,
     required: [true, "Filename is requird"] 
    },

  filepath: { 
    type: String, 
    required: [true, "Url is required"]
 },

  uploadedBy: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User" ,
     required: [true,"User is required"]
    }
});
const filesUpload =  mongoose.model("files",fileSchema)
module.exports = filesUpload;