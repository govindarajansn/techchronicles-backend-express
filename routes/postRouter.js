import { Router } from "express";
import {
  createPost,
  editPost,
  deletePost,
  getAllPosts
} from "../controller/postController.js";
import authJwt from "../middleware/auth.js";

const router = Router();

router.route("/").post(authJwt.verifyToken, createPost);

router
  .route("/")
  .get(getAllPosts)
  .put(authJwt.verifyToken, editPost)
  .delete(authJwt.verifyToken, deletePost);

export default router;
