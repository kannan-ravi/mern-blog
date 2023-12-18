import express from "express";
import postController from "../controller/post.controller.js";
import { uploadForPost } from "../middleware/multerHandler.js";
import verifyToken from "../middleware/verifyToken.js";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.route("/recent-posts").get(postController.getRecentPost);
router
  .route("/:id")
  .get(postController.getPost)
  .put(verifyToken, postController.updatePost)
  .delete(verifyToken, postController.deletePost);

router.route("/new-post/:id").post(verifyToken, postController.createPost);
router.route("/my-posts/:id").get(verifyToken, userController.getUserPosts);
router
  .route("/images")
  .post(uploadForPost.single("image"), postController.uploadPostImage);
export default router;
