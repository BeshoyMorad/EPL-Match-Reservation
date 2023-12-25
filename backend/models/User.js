import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
  gender: {
    type: String,
    default: "male",
    enum: ["male", "female"],
    required: true,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: "fan",
    enum: ["fan", "manager"],
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
});

const User = mongoose.model("User", userSchema);

export default User;
