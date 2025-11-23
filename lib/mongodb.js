import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    // If already connected, return
    return;
  }
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectToDatabase;