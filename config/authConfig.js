import dotenv from "dotenv";

dotenv.config();

const authConfig = { jwtSecret: process.env.JWT_SECRET };

export default authConfig;
