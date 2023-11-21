import express from "express";
import postController from "../controller/post.controller.js";
const router = express.Router();

router
  .route("/:id")
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);
router.route("/new-post").post(postController.createPost);
export default router;
