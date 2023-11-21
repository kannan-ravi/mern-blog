import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
import userRouter from "./router/user.route.js";
import postRouter from "./router/post.route.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);

app.use(errorHandler.defaultErrorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to DATABASE");
  app.listen(PORT, () => {
    console.log(`Your server is running on PORT ${PORT}`);
  });
});
