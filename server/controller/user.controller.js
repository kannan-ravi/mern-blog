import errorHandler from "../middleware/errorHandler.js";
import userModel from "../models/user.model.js";

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler.customErrorHandler(401, "You can only update your account")
    );
  }

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(password, 11);
    }

    const updateUser = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          fullname: req.body.fullname,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
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

export default { updateUser };
