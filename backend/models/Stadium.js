import mongoose, { Schema } from "mongoose";

const stadiumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfRows: {
    type: Number,
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  matches: [
    {
      matchId: {
        type: Schema.Types.ObjectId,
        ref: "Match",
      },
    },
  ],
});

const Stadium = mongoose.model("Stadium", stadiumSchema);

export default Stadium;
