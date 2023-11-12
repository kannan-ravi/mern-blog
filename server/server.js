import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connection.once("open", () => {
  console.log("Connected to DATABASE");
  app.listen(PORT, () => {
    console.log(`Your server is running on PORT ${PORT}`);
  });
});
