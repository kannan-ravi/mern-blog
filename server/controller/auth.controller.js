import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 11);
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ Message: "User Has Created" });
  } catch (error) {
    next(error);
  }
};

export default { registerUser };
