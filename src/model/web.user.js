import { Schema, model } from "mongoose";

const weUserSchema = new Schema(
  {
    id: String,
    username: String,
    email: String,
    password: String,
    totalnumbers: Number,
    country: String,
    state: String
  },
  { timestamps: true }
);

export const webUserModel = model("webusers", weUserSchema);
