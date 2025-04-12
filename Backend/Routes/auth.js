import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Signup route (unchanged)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error in signup", error: err });
  }
});

// Updated login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPass(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true for production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 3600000,
      domain:
        process.env.NODE_ENV === "production" ? "yourdomain.com" : "localhost",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email }, // Send user info without sensitive data
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});
router.get("/verify", async (req, res) => {
  try {
    // Log the incoming request to check if the cookie is being sent
    console.log("Incoming request for /verify");
    console.log("Cookies received:", req.cookies); // Log all cookies to verify the token

    const token = req.cookies.token;

    if (!token) {
      console.log("No token found in cookies"); // Log when token is missing
      return res
        .status(401)
        .json({ valid: false, message: "No token provided" });
    }

    // Log the token value (only for debugging purposes, don't do this in production)
    console.log("Token from cookies:", token);

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET); // Try to decode the token
      console.log("Token decoded successfully:", decoded); // Log the decoded token
    } catch (err) {
      console.error("Token verification failed:", err); // Log token verification failure
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ valid: false, message: "Token expired" });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ valid: false, message: "Invalid token" });
      }
      return res
        .status(500)
        .json({ valid: false, message: "Token verification failed" });
    }

    // Optional: Check if user still exists in DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("User not found in DB for userId:", decoded.userId); // Log user not found
      return res.status(401).json({ valid: false, message: "User not found" });
    }

    // Log the user data being returned
    console.log("User found:", user);

    // Return minimal user info if needed
    res.status(200).json({
      valid: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Verify route error:", err); // Log any unexpected errors
    res.status(500).json({
      valid: false,
      message: "Token verification failed",
      error: err.message,
    });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
