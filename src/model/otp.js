import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    otp: Number,
    email: String
  },
  { timestamps: true }
);

export const otpModel = model("otp", otpSchema);
