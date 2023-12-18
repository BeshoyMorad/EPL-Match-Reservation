import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
  role: {
    type: String,
    default: "guest",
    enum: ["fan", "manager"],
    required: true,
  },
  gender: {
    type: String,
    default: "male",
    enum: ["male", "female"],
    required: true,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  matches: [
    {
      matchId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Match",
      },
    },
  ],
  reservations: [
    {
      reservationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Reservation",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
