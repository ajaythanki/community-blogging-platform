const router = require("express").Router();
const {
  create,
  getAll,
  updateByID,
  updateThumbnail,
} = require("../controllers/blog");
const { isAuth } = require("../utils/middleware");
router
  .get("/", getAll) // route: GET /api/blogs - Retrieve All blogs from the database
  .post("/", isAuth, create) // route: POST /api/blogs/create - Create blog
  .put("/:id", isAuth, updateByID) // route: PUT /api/blogs/:id - Update blog by blog Id
  .put("/update-thumbnail/:id", isAuth, updateThumbnail); // route: POST /api/blogs/update-thumbnail/:id - Update blog Image by blog Id

module.exports = router;