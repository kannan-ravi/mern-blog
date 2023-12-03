import express from "express";
import postController from "../controller/post.controller.js";
import { uploadForPost } from "../middleware/multerHandler.js";

const router = express.Router();

router
  .route("/:id")
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

router.route("/new-post").post(postController.createPost);

router
  .route("/images")
  .post(uploadForPost.single("image"), postController.uploadPostImage);
export default router;
