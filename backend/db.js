import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error(
        "MongoDB connection string is missing. Add MONGODB_URI to .env"
      );
    }

    const connection =
      await mongoose.connect(mongoURI);

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
};

export default connectDB;