const router = require("express").Router();
const {
  login,
  signUp,
  changePassword,
  verifyProfile,
  logout,
} = require("../controllers/auth");
const { verifyToken, isAuth } = require("../utils/middleware");

router
  .post("/login", login) // route: POST api/auth/login - User Login
  .post("/logout", isAuth, logout) // route: POST api/auth/login - User Login
  .post("/signup", signUp) // route: POST api/auth/signup - User Signup
  .post("/verify", verifyToken, verifyProfile) // route: POST api/auth/verify - Verify User Profile
  .post("/change-password", verifyToken, changePassword); // route: POST api/auth/change-password - Change User Profile

module.exports = router;
