const Blog = require("../models/blog");
const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadImage, deleteImage } = require("../utils/helper");
const logger = require("../utils/logger");

const getAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate({
      path: "author",
      select: "username email",
    });
    blogs.length;
    res.status(200).json({
      success: true,
      blogs,
      total: blogs.length,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const getById = async (req, res, next) => {
  try {
    if (!req.params?.id) {
      return next(new ErrorHandler("Blog ID is required", 400));
    }
    const blog = await Blog.findById(req.params.id).populate({
      path: "author",
      select: "username email",
    });
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

const create = async (req, res, next) => {
  const { title, description, category, thumbnail, tags } = req.body;
  if (!title || !description || !category || !tags) {
    return next(
      new ErrorHandler("Please provide all the required fields", 400)
    );
  }
  const author = await User.findById(req.user.id);
  if (!author) {
    return next(new ErrorHandler("Unauthorized", 403));
  }
  try {
    const createBlog = new Blog({
      title,
      description,
      category,
      author: author.id,
      tags,
    });

    if (!createBlog) {
      return next(new ErrorHandler("Failed to create blog", 400));
    }

    if (thumbnail) {
      const uploadResult = await uploadImage(thumbnail, "thumbnails");
      createBlog.thumbnail = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };

      await createBlog.save();
    }
    // req?.user?.blogs?.push(createBlog._id)
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
const getBlogsByUser = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return next(new ErrorHandler("Unauthorized Request", 400));
    }
    const blogs = await Blog.find({ author: req.user.id }).populate({
      path: "author",
      select: "username email",
    });
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const getBlogsByCategory = async (req, res, next) => {
  try {
    if (!req.body.category) {
      return next(new ErrorHandler("Category is required", 400));
    }
    const blogs = await Blog.find({ category: req.body.category }).populate({
      path: "author",
      select: "username email",
    });
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const updateByID = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description, category, tags, thumbnail } = req.body;
  try {
    if (title || description || category || tags || thumbnail) {
      if (!thumbnail.includes('cloudinary')) {
        const blog = await Blog.findById(blogId);
        const uploadResult = await uploadImage(thumbnail, "thumbnails");
        blog.thumbnail = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
        await blog.save();
        // if (blog.thumbnail?.public_id) {
        //   await deleteImage(blog.thumbnail.public_id);
        // }
      }
      delete req.body?.thumbnail
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
  const { thumbnail } = req.body;
  try {
    if (!thumbnail) {
      return next(new ErrorHandler("Please provide thumbnail", 400));
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
    await blog.save();
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
    if (blog) {
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

module.exports = {
  getAll,
  create,
  updateByID,
  deleteByID,
  updateThumbnail,
  getById,
  getBlogsByUser,
  getBlogsByCategory
};
