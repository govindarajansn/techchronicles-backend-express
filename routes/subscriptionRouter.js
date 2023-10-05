import express from "express";
import {
  subscribe,
  unSubscribe
} from "../controller/subscriptionController.js";
import authJwt from "../middleware/auth.js";

const router = express.Router();

router.route("/subscribe").post(authJwt.verifyToken, subscribe);
router.route("/unsubscribe").post(authJwt.verifyToken, unSubscribe);

export default router;
