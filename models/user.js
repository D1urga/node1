import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  cars: [{ type: mongoose.Schema.ObjectId, ref: "Car" }],
});

export const User = mongoose.model("User", userSchema);
