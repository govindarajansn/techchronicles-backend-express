import { Router } from "express";
import { likePost, unlikePost } from "../controller/likeController.js";
import authJwt from "../middleware/auth.js";

const router = Router();

router.route("/like").post(authJwt.verifyToken, likePost);
router.route("/unlike").post(authJwt.verifyToken, unlikePost);

export default router;
