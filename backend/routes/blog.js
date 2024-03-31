const router = require("express").Router();
const {
  create,
  getAll,
  updateByID,
  getById,
  updateThumbnail,
  getBlogsByUser,
  getBlogsByCategory,
  deleteByID
} = require("../controllers/blog");
const { isAuth } = require("../utils/middleware");
router
  .get("/", getAll) // route: GET /api/blogs - Retrieve All blogs from the database
  .post("/", isAuth, create) // route: POST /api/blogs/create - Create blog
  .get("/user", isAuth, getBlogsByUser) // route: PUT /api/blogs/user - Update blog by blog Id
  .post("/category", isAuth, getBlogsByCategory) // route: PUT /api/blogs/user - Update blog by blog Id
  .get("/:id", isAuth, getById) // route: PUT /api/blogs/:id - Update blog by blog Id
  .put("/:id", isAuth, updateByID) // route: PUT /api/blogs/:id - Update blog by blog Id
  .delete("/:id", isAuth, deleteByID) // route: PUT /api/blogs/:id - Update blog by blog Id
  .put("/update-thumbnail/:id", isAuth, updateThumbnail); // route: POST /api/blogs/update-thumbnail/:id - Update blog Image by blog Id

module.exports = router;