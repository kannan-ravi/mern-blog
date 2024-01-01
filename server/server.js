import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/connectDB.js";
import authRouter from "./router/auth.route.js";
import userRouter from "./router/user.route.js";
import postRouter from "./router/post.route.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static("./server/public"));

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "/client/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Your Server is READY");
//   });
// }

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler.defaultErrorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to DATABASE");
  app.listen(PORT, () => {
    console.log(`Your server is running on PORT ${PORT}`);
  });
});
