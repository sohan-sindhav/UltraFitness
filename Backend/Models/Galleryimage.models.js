const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Equipment", "Yoga", "Cardio", "Training", "Facilities", "Classes"],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
