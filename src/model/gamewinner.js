import { Schema, model } from "mongoose";

const gamewinner = new Schema(
  {
    numbers: Array
  },
  { timestamps: true }
);

export const gameWinnerModel = model("gamewinner", gamewinner);
