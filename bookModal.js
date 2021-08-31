import mongoose from "mongoose";

const instance = mongoose.Schema({
  bookName: String,
  bookAuthor: String,
  bookDescription: String,
  bookCatagory: String,
  bookLink: String,
  bookImage: String,
});

export default mongoose.model("bookModal", instance);
