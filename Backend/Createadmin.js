require("dotenv").config();
const User = require("./Models/users.models");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const createAdmin = async () => {
  const username = "admin";
  const password = "admin123"; // Change this in production!

  try {
    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const admin = new User({
      username,
      password,
      isAdmin: true,
    });

    await admin.save();
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin user:", err);
    process.exit(1);
  }
};

createAdmin();
