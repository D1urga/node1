import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    name: String,
    publishYear: Number,
    author: String,
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
