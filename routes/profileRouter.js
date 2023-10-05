import { Router } from "express";
import { updateProfile, getProfile } from "../controller/profileController.js";
import authJwt from "../middleware/auth.js";

const router = Router();

router.route("/").put(authJwt.verifyToken, updateProfile); // PUT method for updates
router.route("/").get(authJwt.verifyToken, getProfile);

export default router;
