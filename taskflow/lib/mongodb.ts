import mongoose from "mongoose";

export async function connectDB() {
  const uri =
    process.env.MONGODB_URI_DEV ||
    process.env.MONGODB_URI_PRO ||
    process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MongoDB URI missing in .env");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.name);

    return mongoose;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}
