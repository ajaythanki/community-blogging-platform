const Blog = require("../models/blog");
const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadImage, deleteImage } = require("../utils/helper");
const logger = require("../utils/logger");

const getAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate({path:"author",select: "username email"});
    blogs.length
    res.status(200).json({
      success: true,
      blogs,
      total:blogs.length
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

const create = async (req, res, next) => {
  const { title, description, category, thumbnail, tags } =
    req.body;
  const author = req.decodedToken.id;
  if (
    !title ||
    !description ||
    !category ||
    !tags
  ) {
    return next(
      new ErrorHandler("Please provide all the required fields", 400)
    );
  }
  try {
    // logger.info("working upto this", createBlog)
    const createBlog = new Blog({
      title,
      description,
      category,
      author,
      tags,
    });


    if(!createBlog){
      return next(new ErrorHandler("Failed to create blog", 400));
    }

    if(thumbnail){
      const uploadResult = await uploadImage(thumbnail, "thumbnails");
        createBlog.thumbnail = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
  
      await createBlog.save();
    }
    req?.user?.blogs?.push(createBlog._id)
    res.status(201).json({
      success: true,
      message: `Blog Created`,
      blog: createBlog,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

const updateByID = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description, category, tags } =
    req.body;
  try {
    if(title || description || category || tags){
      const blog = await Blog.findByIdAndUpdate(blogId, req.body, {
        new: true,
      });
      res.status(201).json({
        success: true,
        message: `Blog Updated`,
        blog,
      });
    }
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const updateThumbnail = async (req, res, next) => {
  const blogId = req.params.id;
  const { thumbnail } =  req.body;
  try {
    if(!thumbnail){
      return next(
        new ErrorHandler("Please provide thumbnail", 400)
      );
    }
      const blog = await Blog.findById(blogId);

      if (blog.thumbnail?.public_id) {
        await deleteImage(blog.thumbnail.public_id);
      } 
      
        const uploadResult = await uploadImage(thumbnail, "thumbnails");
        blog.thumbnail = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
        await blog.save()
    res.status(201).json({
      success: true,
      message: `Blog Thumbnail Updated`,
      blog,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const deleteByID = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if(blog){
      await Blog.findByIdAndRemove(blogId);
      if (blog?.thumbnail?.public_id) {
        await deleteImage(blog.thumbnail.public_id);
      } 
      res.status(200).json({
        success: true,
        message: `Blog Deleted`,
      });
    }
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = { getAll, create, updateByID, deleteByID, updateThumbnail };