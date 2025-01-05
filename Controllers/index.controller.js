const User = require("../Models/user.models");
const path = require("path");
const cloudinary = require('cloudinary')
const fs = require('fs');
const filesUpload = require('../Models/files.models');



const home_page = async (req, res) => {
       const userFile = await filesUpload.find({
        uploadedBy:req.user.id
       })

  res.render("home",{
    files:userFile,
  });
};
function isFileSupported(type,supportedfilestypes){
  return supportedfilestypes.includes(type)
}


const fileUpload = async (req, res) => {
  try {
      // Check if file is present in the request
      if (!req.files || !req.files.file) {
          return res.status(400).send({
              success: false,
              message: "No file uploaded. Please select a file.",
            });
        }
        const file = req.files.file;
          //  console.log(file);
           
        const supportedfilestypes = ["jpeg","png","jpg","mp4", "avi", "mov","pdf"]
        const filetype =file.name.split('.')[1].toLowerCase();
          //  console.log("File type is :" + filetype);
             
        if(!isFileSupported(filetype,supportedfilestypes)){
          return res.status(400).send({
              success: false,
              message: "Unsupported file type. Please select a JPEG, PNG, JPG, MP4, AVI, MOV, PDF file.",
            });
        }

    //  used for moving files in one file up from the current directory current directory mtlb __dirname or for moving one directory up from the current directory this below code is used
    // const parentDir = path.join(__dirname, "..");
    // console.log(parentDir); // Parent directory of __dirname

    //  creating file path
    // let filePath = parentDir + "/files/" + Date.now() + "." + filetype;
              
    
    //  moving file in this folder / path in server
              // await file.mv(filePath);
              //  uploading file to cloudinary 
                 //  saving file in cloudinary
               const   resource_type = filetype === "pdf" ? "raw" :  file.mimetype.startsWith("video") ? "video" : "auto" // Use 'video' for videos, 'auto' for other
                      // console.log("resource type: " + resource_type);
                      
                 const option={
                          resource_type:"auto",
                  folder: "Drive"
                }
                // console.log(option);
                 const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath,option);
                          //  console.log(uploadResponse);
                             
                          //  save file details in database

                        let newFile = new filesUpload({
                          filename: file.name,
                          filepath:uploadResponse.secure_url,
                          uploadedBy:req.user.id

                        })
                              
                              newFile =  await newFile.save();
                    // Delete the local file after successful upload
                        // if (uploadResponse){
                        //   fs.unlink(filePath, (unlinkErr) => {
                        //     if (unlinkErr) {
                        //       console.error("Error deleting local file:", unlinkErr);
                        //     } else {
                        //       console.log("Local file deleted successfully.");
                        //     }
                        //   });
                        // }


                res.status(200).send({
                  success: true,
                  message: " File uploaded successfully",
                  newFile
                })
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = { home_page, fileUpload };
