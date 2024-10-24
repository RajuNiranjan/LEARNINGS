import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true, default: "" },
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
