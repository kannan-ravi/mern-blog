import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import errorHandler from "../middleware/errorHandler.js";

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const validUserUser = await userModel.findOne({
    username: req.body.username,
  });
  if (validUserUser) {
    return next(
      errorHandler.customErrorHandler(409, "Username is already taken")
    );
  }
  const validUserEmail = await userModel.findOne({ email });
  if (validUserEmail) {
    return next(
      errorHandler.customErrorHandler(409, "Email already exist, please login")
    );
  }

  const hashedPassword = await bcrypt.hash(password, 11);
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ Message: "User Has Created" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser)
      return next(
        errorHandler.customErrorHandler(404, "User not found, Please register")
      );

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword)
      return next(
        errorHandler.customErrorHandler(401, "Email/Password is incorrect")
      );

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expireDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("access_token").status(200).json("Sign Out Success");
};

const isAuthenticated = async (req, res) => {
  if (req.user.id === req.params.id) {
    const validUser = await userModel.findOne({ _id: req.params.id });
    const { password, ...rest } = validUser._doc;
    return res.json(rest);
  } else {
    next(error);
  }
};

export default { registerUser, loginUser, logoutUser, isAuthenticated };
