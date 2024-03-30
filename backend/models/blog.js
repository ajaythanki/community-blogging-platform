const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog Title is required"],
  },
  description: {
    type: String,
  },
  thumbnail: {
    public_id: String,
    url: String,
  },
  category: {
    type: String,
    required: [true, "Blog Category is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Blog Author is required"],
  },
  
});

module.exports = mongoose.model("Item", blogSchema);