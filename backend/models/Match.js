import mongoose, { Schema } from "mongoose";

const matchSchema = mongoose.Schema({
  homeTeamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  awayTeamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  venueId: {
    type: Schema.Types.ObjectId,
    ref: "Stadium",
    required: true,
  },
  dateAndTime: {
    type: Date,
    required: true,
  },
  mainReferee: {
    type: String,
    required: true,
  },
  firstLinesman: {
    type: String,
    required: true,
  },
  secondLinesman: {
    type: String,
    required: true,
  },
  spectators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Match = mongoose.model("Match", matchSchema);

export default Match;
