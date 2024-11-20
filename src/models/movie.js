import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publishingYear: { type: Number, required: true },
  poster: { type: String, required: false },
});

export default mongoose.models.Movies || mongoose.model("Movies", MovieSchema);
