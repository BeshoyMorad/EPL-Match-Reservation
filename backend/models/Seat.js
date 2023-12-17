import mongoose, { Schema } from "mongoose";

const seatSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  reservations: [
    {
      reservationId: {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    },
  ],
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
