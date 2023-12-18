import mongoose, { Schema } from "mongoose";

const seatSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  vacant: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
