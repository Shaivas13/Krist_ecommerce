import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
try {
// Check if authorization header exists
if (!req.headers.authorization) {
return next(createError(401, "You are not authenticated!"));
}

const token = req.headers.authorization.split(" ")[1];
if (!token) {
  return next(createError(401, "Token not found!"));
}

// Ensure JWT secret is set in environment
if (!process.env.JWT) {
  throw new Error("JWT secret is not defined in environment variables");
}

// Verify token
const decoded = jwt.verify(token, process.env.JWT);

// Attach decoded data (e.g., userId) to the request object
req.user = decoded;

// Continue to next middleware or route handler
next();


} catch (err) {
// Handle expired or invalid token errors gracefully
if (err.name === "TokenExpiredError") {
return next(createError(403, "Token has expired. Please login again."));
}
if (err.name === "JsonWebTokenError") {
return next(createError(403, "Invalid token. Authentication failed."));
}


}
};
