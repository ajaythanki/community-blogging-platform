const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { v2: cloudinary } = require("cloudinary");
const config = require("./config");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

const uploadImage = async (img, folder) => {
  const result = await cloudinary.uploader.upload(img, { folder });
  if (!result) {
    console.log(error);
  } else {
    console.log(result);
    return result;
  }
};
const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    if (!result) {
      console.log(error);
    } else {
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log(error)    
  }
};



const decryptUserData = (encryptedData, secretKey) => {
  try {
    const algorithm = "aes-256-cbc";
    const [ivHex, encryptedUserHex] = encryptedData.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedUser = Buffer.from(encryptedUserHex, "hex");
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey),
      iv
    );
    let decryptedUser = decipher.update(encryptedUser);
    decryptedUser = Buffer.concat([decryptedUser, decipher.final()]);
    return decryptedUser.toString();
  } catch (error) {
    console.log(`Error in decryption:`, error);
    return null;
  }
};

const verifyHashToken = (token, secretKey) => {
  try {
    const decryptedUserData = decryptUserData(token, secretKey);
    const userData = JSON.parse(decryptedUserData);
    return userData;
  } catch (error) {
    console.log(`Error in verification:`, error);

    return null;
  }
};

const createJwtToken = (userData, expiresIn, JWT_SECRET) => {
  try {
    const algorithm = "aes-256-cbc";
    const secretKey = config.ENCRYPTION_SECRET_KEY;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encryptedUser = cipher.update(JSON.stringify(userData), "utf8", "hex");
    encryptedUser += cipher.final("hex");
    const token = `${iv.toString("hex")}:${encryptedUser}`;
    return jwt.sign({ token }, JWT_SECRET, { expiresIn });
  } catch (error) {
    console.log(`Error in generating token:`, error);
    return null;
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  verifyHashToken,
  createJwtToken,
};
