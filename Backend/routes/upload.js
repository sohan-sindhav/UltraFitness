import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../Utils/cloudinary.js";
import GalleryImage from "../models/GalleryImages.js";
import mongoose from "mongoose";

const router = express.Router();

// Configure multer with file size limits
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

router.post("/upload", upload.single("image"), async (req, res) => {
  console.log("\n===== NEW UPLOAD REQUEST RECEIVED =====");

  try {
    // Validate input
    if (!req.file) {
      console.log("ERROR: No file received in upload");
      return res.status(400).json({ error: "No image file provided" });
    }

    if (!req.body.title || !req.body.tag) {
      console.log("ERROR: Missing title or tag");
      return res.status(400).json({ error: "Title and tag are required" });
    }

    // Upload to Cloudinary using buffer method (more reliable)
    console.log("Starting Cloudinary upload...");
    const uploadStartTime = Date.now();

    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "Ultra_fitness",
        resource_type: "image",
      }
    );

    console.log(
      `Cloudinary upload completed in ${Date.now() - uploadStartTime}ms`
    );

    // Verify database connection before saving
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database connection not ready");
    }

    // Save to database
    console.log("Saving to database...");
    const newImage = new GalleryImage({
      title: req.body.title,
      tag: req.body.tag,
      imageUrl: uploadResult.secure_url,
    });

    await newImage.save();
    console.log("Database save complete");

    // Return success response
    res.status(200).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error("\n===== UPLOAD ERROR =====");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);

    let statusCode = 500;
    let errorMessage = "Upload failed";

    if (error.message.includes("File too large")) {
      statusCode = 413;
      errorMessage = "File size exceeds 5MB limit";
    } else if (error.message.includes("image files")) {
      statusCode = 400;
      errorMessage = "Only image files are allowed";
    } else if (
      error.message.includes("Cloudinary") ||
      error.message.includes("upload")
    ) {
      errorMessage = "Image upload service error";
    } else if (error.message.includes("Database")) {
      errorMessage = "Database operation failed";
    }

    res.status(statusCode).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

router.get("/gallery", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch images",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
