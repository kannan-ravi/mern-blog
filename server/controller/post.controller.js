import postModel from "../models/post.model.js";

const getPost = async (req, res, next) => {};

const createPost = async (req, res, next) => {
  const { title, subtitle, content, author, date } = req.body;
  try {
    const newPost = new postModel({ title, subtitle, content, author, date });
    await newPost.save();
    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {};

const deletePost = async (req, res, next) => {};

export default { getPost, createPost, updatePost, deletePost };
