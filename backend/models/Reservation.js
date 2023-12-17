import mongoose, { Schema } from "mongoose";

const reservationSchema = mongoose.Schema({
  ticketNumber: {
    type: Number,
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  seats: [
    {
      seatId: {
        type: Schema.Types.ObjectId,
        ref: "Seat",
      },
    },
  ],
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
