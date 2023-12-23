import mongoose from "mongoose";
import bcrypt from "bcrypt";

const testSchema = new mongoose.Schema({
  name: String,
});

testSchema.pre("save", async function (next) {
  this.name = await bcrypt.hash(this.name, 8);
  next();
});

export const TestModel = mongoose.model("TestModel", testSchema);
