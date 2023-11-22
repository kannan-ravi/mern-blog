import express from "express";
import userController from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/update/:id").put(verifyToken, userController.updateUser);

export default router;
