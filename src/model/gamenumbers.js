import { Schema, model } from "mongoose";

const gamenumbers = new Schema(
  {
    username: String,
    email: String,
    numbers: Array,
    duplicateCount: Number,
    unique: Number,
    isActive: Boolean,
    ipaddress: String
  },
  { timestamps: true }
);

export const gameNumberModel = model("gamenumbers", gamenumbers);
