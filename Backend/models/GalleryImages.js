import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    tag: {
      type: String,
      enum: {
        values: [
          "equipment",
          "yoga",
          "cardio",
          "training",
          "facilities",
          "classes",
          "others",
        ],
        message: "Invalid tag value",
      },
      required: [true, "Tag is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: (v) => {
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: "Invalid image URL format",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add index for better query performance
GalleryImageSchema.index({ tag: 1, createdAt: -1 });

export default mongoose.model("GalleryImage", GalleryImageSchema);
