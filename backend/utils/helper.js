const jwt = require("jsonwebtoken");

exports.createToken = (data, secret, expiresIn) => {
  return jwt.sign(data, secret, { expiresIn });
};

const { v2: cloudinary } = require("cloudinary");
const config = require("./config");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

exports.uploadImage = async (img, folder) => {
  const result = await cloudinary.uploader.upload(img, { folder });
  if (!result) {
    console.log(error);
  } else {
    console.log(result);
    return result;
  }
};
exports.deleteImage = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id);
  if (!result) {
    console.log(error);
  } else {
    // console.log(result);
    return result;
  }
};