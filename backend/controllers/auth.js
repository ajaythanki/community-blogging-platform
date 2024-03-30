const User = require("../models/user");
const config = require("../utils/config");

const ErrorHandler = require("../utils/ErrorHandler");
const { asyncHandler, verifyToken } = require("../utils/middleware");
const logger = require("../utils/logger");
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../utils/sendMail");
const { COOKIE_NAME } = require("../utils/constants");
const { createToken } = require("../utils/helper");

// route: POST /auth/login || User Login
const login = asyncHandler(async (req, res, next) => {
  try {
    // Extract necessary data from the request body
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });
      console.log(User);
      const isCorrectPassword =
        user === null ? false : await user.comparePassword(password);

      if (!(user && isCorrectPassword)) {
        return next(new ErrorHandler("Invalid username or password", 400));
      }
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const token = createToken(userForToken, config.SECRET, "7d");

      // Send a success message, token and the logged user as a response
      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        // days * hours * minutes * seconds * milliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        signed: true,
      });
      res.status(200).send({
        success: true,
        message: "Logged In Successfully.",
        user: { id: user.id, email: user.email },
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Error: Missing Email or Password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// route: POST /auth/signup || User Signup
const signUp = asyncHandler(async (req, res, next) => {
  try {
    // Extract necessary data from the request body
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    //check if email exists
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist.", 400));
    }

    const user = req.body;
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const { verificationCode, token } = createVerificationData(user);
    logger.info(verificationCode);
    const data = { user: { username }, verificationCode };
    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/account-verification.ejs"),
      data
    );

    try {
      await sendMail({
        email,
        subject: "Activate Your Account",
        template: html,
        data,
      });

      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        // minutes * seconds * milliseconds
        maxAge: 10 * 60 * 1000, //10 minutes

        httpOnly: true,
        signed: true,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${email} to verify your account.`,
      });
    } catch (error) {
      logger.error(error);
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.decodedToken.id;
  const user = await User.findById(userId);

  const isCorrectPassword =
    !oldPassword || !newPassword
      ? false
      : await user.comparePassword(oldPassword);

  if (!isCorrectPassword) {
    return next(new ErrorHandler("Invalid username or password", 400));
  }

  user.password = newPassword;

  result = user.save();
  if (result) {
    res.status(201).json({
      success: true,
      message: `Password changed successfully.`,
    });
  } else {
    return next(new ErrorHandler("Invalid username or password", 400));
  }
});

const verifyProfile = asyncHandler(async (req, res, next) => {
  try {
    // Extract the verification token and verification code from the request body
    const { verificationCode } = req.body;

    // Get the user from the database
    const user = await User.findOne({ email: req.decodedToken.user.email });

    // If the user is already verified, return an error message
    if (user?.isVerified) {
      return next(new ErrorHandler("User is already verified.", 400));
    }

    // Validate the verification code
    if (
      parseInt(req.decodedToken.verificationCode) !== parseInt(verificationCode)
    ) {
      return next(new ErrorHandler("Invalid verification code.", 400));
    }

    // Save the user's account with status verified
    const newUser = new User({
      ...req.decodedToken.user,
      isVerified: true,
    });
    await newUser.save();

    // Send a success message to the client
    res
      .status(200)
      .json({ success: true, message: "Account verified successfully." });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  login,
  signUp,
  verifyProfile,
  changePassword,
};

const createVerificationData = (user) => {
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = createToken({ user, verificationCode }, config.SECRET, "5m");

  return { verificationCode, token };
};
