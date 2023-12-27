import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.ObjectId,
    ref: "PipelineModel",
  },
  channel: {
    type: String,
  },
});

export const Subscription = mongoose.model("Subscription", subSchema);
