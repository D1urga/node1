import mongoose from "mongoose";
import { TestModel } from "./testingmodel.js";

const bookSchema = mongoose.Schema(
  {
    name: String,
    publishYear: Number,
    author: String,
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
    },
  },
  { timestamps: true }
);

// bookSchema.pre("validate", async function () {
//   const data = TestModel({ name: "anoop" });
//   await data.save();
//   console.log("executed");
//   console.log(this._id, this.name, this.publishYear, this.author);
// });

export const Book = mongoose.model("Book", bookSchema);
