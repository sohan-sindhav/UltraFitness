import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../Utils/cloudinary.js";
import GalleryImage from "../models/GalleryImages.js";

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
  try {
    // Validate input
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    if (!req.body.title || !req.body.tag) {
      return res.status(400).json({ error: "Title and tag are required" });
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "Ultra_fitness",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Save to database
    const newImage = new GalleryImage({
      title: req.body.title,
      tag: req.body.tag,
      imageUrl: uploadResult.secure_url,
    });

    await newImage.save();

    // Return success response
    res.status(200).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error("Upload error:", error);

    // Handle specific errors
    let statusCode = 500;
    let errorMessage = "Upload failed";

    if (error.message.includes("File too large")) {
      statusCode = 413;
      errorMessage = "File size exceeds 5MB limit";
    } else if (error.message.includes("image files")) {
      statusCode = 400;
      errorMessage = "Only image files are allowed";
    } else if (error.message.includes("Cloudinary")) {
      errorMessage = "Image upload service error";
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
