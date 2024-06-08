require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: process.env.name,
    api_key: process.env.key, 
    api_secret: process.env.secret,
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'my_files',
      allowedFormats: ["jpg","png","jpeg"],
    },
  });
  module.exports = {
    storage
  };