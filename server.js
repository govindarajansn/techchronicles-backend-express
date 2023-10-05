import express from "express";
import bodyparser from "body-parser";
const { json, urlencoded } = bodyparser;
import cookieParser from "cookie-parser";
import cors from "cors";
import blogRouter from "./routes/blogRouter.js";
import healthRouter from "./routes/healthRouter.js";
import postRouter from "./routes/postRouter.js";
import favoriteRouter from "./routes/favoriteRouter.js";
import profileRouter from "./routes/profileRouter.js";
import likeRouter from "./routes/likeRouter.js";
import ratingRouter from "./routes/ratingRouter.js";
import userAuthRouter from "./routes/userAuthRouter.js";
import subscriptionRouter from "./routes/subscriptionRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use("/v1/blogs", blogRouter);
app.use("/v1/post", postRouter);
app.use("/v1", likeRouter);

app.use("/v1/profile", profileRouter);

app.use("/v1/favorites", favoriteRouter);

app.use("/", healthRouter);

app.use("/v1/ratings", ratingRouter);
app.use("/v1/", subscriptionRouter);
app.use("/", userAuthRouter);

export default app;
