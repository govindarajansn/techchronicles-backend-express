import { Router } from "express";
import checkHealth from "../controller/healthCheckController.js";

const router = new Router();

router.route("/health").get(checkHealth);

export default router;
