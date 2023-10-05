import jwt from "jsonwebtoken";
import config from "../config/authConfig.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["tc-user-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    console.log(decoded);
    req.userId = decoded.sub;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken
};

export default authJwt;
