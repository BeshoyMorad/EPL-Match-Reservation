import mongoose, { Schema } from "mongoose";

const reservationSchema = mongoose.Schema({
  ticketNumber: {
    type: Number,
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
  seatIndex: {
    type: Number,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
