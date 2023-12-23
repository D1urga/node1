import mongoose from "mongoose";

const carSchema = mongoose.Schema({
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  owner: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

export const Car = mongoose.model("Car", carSchema);
