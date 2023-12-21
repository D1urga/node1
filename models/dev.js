import mongoose from "mongoose";

const devSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: { type: Number },
    tech: {
      type: String,
    },
    workExp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Dev = mongoose.model("Dev", devSchema);
