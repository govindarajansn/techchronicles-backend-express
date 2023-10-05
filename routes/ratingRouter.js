import { Router } from "express";
import { submitRating } from "../controller/ratingController.js";
import authJwt from "../middleware/auth.js";

const router = Router();

router.route("/").post(authJwt.verifyToken, submitRating);

export default router;
