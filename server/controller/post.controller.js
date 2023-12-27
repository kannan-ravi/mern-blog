import postModel from "../models/post.model.js";
import errorHandler from "../middleware/errorHandler.js";
import userModel from "../models/user.model.js";

const getPost = async (req, res, next) => {
  try {
    const getPost = await postModel.findOne({ _id: req.params.id });
    res.status(200).json(getPost);
  } catch (error) {
    next(error);
  }
};

const getRecentPost = async (req, res, next) => {
  try {
    const getRecentPost = await postModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    const removeContent = getRecentPost.map(async (post) => {
      const { content, ...rest } = post._doc;
      const user = await userModel.findOne({ _id: post.author });
      return {
        ...rest,
        author: {
          fullname: user.fullname,
          username: user.username,
          profilePicture: user.profilePicture,
          _id: user._id,
        },
      };
    });

    res.status(200).json(await Promise.all(removeContent));
  } catch (error) {
    next(error);
  }
};

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

const updatePost = async (req, res, next) => {
  const { title, subtitle, content, author, category } = req.body;

  try {
    const updatePost = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          subtitle,
          content,
          author,
          category,
        },
      },
      { new: true }
    );
    res.status(200).json("Post Updated");
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deletePost = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Post Deleted");
  } catch (error) {
    next(error);
  }
};

const getPostByCategory = async (req, res, next) => {
  try {
    const getCategory = await postModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    const filteredCatgory = getCategory.filter((post) => {
      return post.category.includes(req.params.category);
    });

    const contentRemoved = filteredCatgory.map(async (post) => {
      const { content, ...rest } = post._doc;
      const user = await userModel.findOne({ _id: post.author });
      return {
        ...rest,
        author: {
          fullname: user.fullname,
          username: user.username,
          profilePicture: user.profilePicture,
          _id: user._id,
        },
      };
    });

    res.status(200).json(await Promise.all(contentRemoved));
  } catch (error) {
    next(error);
  }
};

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

export default {
  getPost,
  createPost,
  updatePost,
  deletePost,
  uploadPostImage,
  getPostByCategory,
  getRecentPost,
};
