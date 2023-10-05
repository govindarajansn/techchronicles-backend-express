import { Router } from "express";
import {
  toggleFavorite,
  getFavorites
} from "../controller/favoriteController.js";
import authJwt from "../middleware/auth.js";

const router = Router();

router
  .route("/")
  .get(authJwt.verifyToken, getFavorites)
  .post(authJwt.verifyToken, toggleFavorite);

export default router;
