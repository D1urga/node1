import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageName: String,
});

export const ImageModel = mongoose.model("ImageModel", imageSchema);
