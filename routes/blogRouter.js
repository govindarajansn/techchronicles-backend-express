import { Router } from "express";
import {
  getCompanyBlogs,
  searchCompanyBlogs,
  filterByTags
} from "../controller/blogController.js";

const router = Router();

router.route("/").get(getCompanyBlogs);
router.route("/search").get(searchCompanyBlogs);
router.route("/filterByTag").get(filterByTags);

export default router;
