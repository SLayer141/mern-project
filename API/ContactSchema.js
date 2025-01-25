import mongoose from "mongoose";

const contactDetails = new mongoose.Schema({
  name: { type: String, require: true },
  gmail: { type: String, require: true },
  phone: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});
export const Contact = mongoose.model("contact", contactDetails);
