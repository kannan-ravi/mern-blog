import errorHandler from "../middleware/errorHandler.js";
import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

// UPDATE USER DETAILS
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler.customErrorHandler(401, "You can only update your account")
    );
  }

  try {
    if (req.body.newpassword && req.body.oldpassword) {
      const validUser = await userModel.findOne({ _id: req.params.id });
      const validPassword = bcrypt.compareSync(
        req.body.oldpassword,
        validUser.password
      );
      if (!validPassword)
        return next(errorHandler.customErrorHandler(409, "Wrong Password"));
      req.body.newpassword = await bcrypt.hash(req.body.newpassword, 11);
    }

    const updateUser = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          fullname: req?.body?.fullname,
          username: req?.body?.username,
          email: req?.body?.email,
          password: req?.body?.newpassword,
          profilePicture: req?.body?.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// UPDATE USER IMAGE
const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json("no file received");
  }

  if (req.user.id !== req.params.id) {
    return next(
      errorHandler.customErrorHandler(401, "You can only update your account")
    );
  }

  const imageUrl = `http://localhost:3000/user-image/${req.file.filename}`;

  try {
    const updateProfilePicture = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          profilePicture: imageUrl,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateProfilePicture._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// USER POSTS
const getUserPosts = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler.customErrorHandler(401, "You can only get your posts")
    );
  }
  try {
    const allPosts = await postModel.find();
    const postUser = await userModel.findOne({ _id: req.params.id });
    const userPosts = allPosts
      .filter((post) => req.params.id == post.author)
      .map((post) => ({ ...post._doc, author: postUser }));

    res.status(200).json(userPosts);
  } catch (error) {
    next(error);
  }
};
export default { updateUser, uploadImage, getUserPosts };
