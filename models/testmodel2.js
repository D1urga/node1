import mongoose from "mongoose";

const testSchema1 = new mongoose.Schema({
  name: String,
});

testSchema1.methods.updateName = function (name) {
  return (this.name = name);
};

export const TestModel1 = mongoose.model("TestModel1", testSchema1);
