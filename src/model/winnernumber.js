import { Schema, model } from "mongoose";

const winnerNumber = new Schema(
  {
    day: Number,
    hour: Number
  },
  { timestamps: true }
);

export const winnerNumberModel = model("winnernumbers", winnerNumber);
