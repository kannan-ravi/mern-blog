import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token)
    return next(errorHandler.customErrorHandler(404, "You are not authorized"));

  jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler.customErrorHandler(401, "Access Denied"));

    req.user = user;
    next();
  });
};

export default verifyToken;
