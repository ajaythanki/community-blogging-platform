require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const MONGO_DB_NAME =
  process.env.NODE_ENV === "development"
    ? process.env.TEST_MONGODB_NAME
    : process.env.MONGODB_NAME;

const ORIGIN =
  process.env.NODE_ENV === "development"
    ? process.env.ORIGIN
    : process.env.MONGODB_NAME;

const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;

const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const VERIFICATION_SECRET = process.env.VERIFICATION_SECRET;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_SERVICE = process.env.SMTP_SERVICE;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

module.exports = {
  MONGODB_URI,
  MONGO_DB_NAME,
  PORT,
  VERIFICATION_SECRET,
  ENCRYPTION_SECRET_KEY,
  ORIGIN,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  CLOUDINARY_URL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SERVICE,
  SMTP_EMAIL,
  SMTP_PASSWORD,
};