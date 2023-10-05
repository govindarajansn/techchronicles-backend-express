import express from "express";
import { checkDecodedUserId } from "../controller/userAuthController.js";
import authJwt from "../middleware/auth.js";
const router = express.Router();

router.get("/test-decoded-user", authJwt.verifyToken, checkDecodedUserId);

export default router;
