import mongoose from "mongoose";
require("dotenv").config();

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  console.log(`Connected to MongoDB:`, process.env.MONGODB_URI);
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;
