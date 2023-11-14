import express from "express";
import userController from "../controller/auth.controller.js";

const router = express.Router();

router.route("/register").post(userController.registerUser);

export default router;
