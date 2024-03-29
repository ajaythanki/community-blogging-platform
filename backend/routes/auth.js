const router = require("express").Router();
const {
  login,
  signUp,
} = require("../controllers/auth");
const { verifyToken } = require("../utils/middleware");

router
  .post("/login", login) // route: POST api/auth/login - User Login
  .post("/signup", signUp) // route: POST api/auth/signup - User Signup

module.exports = router;
