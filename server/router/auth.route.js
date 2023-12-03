import express from "express";
import authController from "../controller/auth.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router
  .route("/isauthenticated/:id")
  .get(verifyToken, authController.isAuthenticated);
export default router;
