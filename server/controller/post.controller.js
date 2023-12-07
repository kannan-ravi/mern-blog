import postModel from "../models/post.model.js";
import errorHandler from "../middleware/errorHandler.js";
const getPost = async (req, res, next) => {};

const createPost = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler.customErrorHandler(401, "You can only update your account")
    );
  }
  
  const { title, subtitle, content, author, category } = req.body;
  if (title && subtitle && content && author && category) {
    try {
      const newPost = new postModel({
        title,
        subtitle,
        content,
        author,
        category,
      });
      await newPost.save();
      res.status(200).json("Post Created");
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler.customErrorHandler(500, req.body));
  }
};

const updatePost = async (req, res, next) => {};

const deletePost = async (req, res, next) => {};

const uploadPostImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const imageUrl = `http://localhost:3000/post-image/${req.file.filename}`;

    const imageData = {
      success: 1,
      file: {
        url: imageUrl,
      },
    };
    return res.status(200).json(imageData);
  } catch (error) {
    return res.status(500).json({ message: "Error uploading image" });
  }
};

export default { getPost, createPost, updatePost, deletePost, uploadPostImage };
