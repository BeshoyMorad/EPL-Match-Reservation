import mongoose, { Schema } from "mongoose";

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  homeMatches: [
    {
      matchId: {
        type: Schema.Types.ObjectId,
        ref: "Match",
      },
    },
  ],
  awayMatches: [
    {
      matchId: {
        type: Schema.Types.ObjectId,
        ref: "Match",
      },
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
