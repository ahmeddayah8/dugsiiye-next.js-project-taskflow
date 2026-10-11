import mongoose from "mongoose";

export async function connectDB() {
  const isProduction = process.env.NODE_ENV === "production";

  const uri = isProduction
    ? process.env.MONGODB_URI_PRO
    : process.env.MONGODB_URI_DEV;

  if (!uri) {
    throw new Error(
      `MongoDB URI missing for ${isProduction ? "production" : "development"}`,
    );
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB connected in ${
        isProduction ? "production" : "development"
      } mode`,
    );

    return mongoose;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}
