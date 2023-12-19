import mongoose from "mongoose";

const publisherSchema = mongoose.Schema(
  {
    name: String,
    location: String,
    publishedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

export const Publisher = mongoose.model("Publisher", publisherSchema);
