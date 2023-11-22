import express from "express";
import authController from "../controller/auth.controller.js";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
export default router;
