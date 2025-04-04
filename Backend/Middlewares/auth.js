const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from "Authorization" header (format: "Bearer <token>")
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract token (remove "Bearer ")
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
