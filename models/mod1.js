import mongoose from "mongoose";

const mod1schema = mongoose.Schema({
  name: String,
});

export const mod1model = mongoose.model("mod1model", mod1schema);
