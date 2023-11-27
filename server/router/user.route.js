import express from "express";
import userController from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../middleware/multerHandler.js";

const router = express.Router();

router.route("/update/:id").put(verifyToken, userController.updateUser);
router
  .route("/upload/:id")
  .post(upload.single("profileImage"), verifyToken, userController.uploadImage);

export default router;
