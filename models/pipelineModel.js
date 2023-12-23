import mongoose from "mongoose";

const pipelineSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  tech: {
    type: [{ type: String }],
  },
  experience: {
    type: Number,
  },
  business: {
    type: [{ type: String }],
  },
});

export const PipelineModel = mongoose.model("PipelineModel", pipelineSchema);
