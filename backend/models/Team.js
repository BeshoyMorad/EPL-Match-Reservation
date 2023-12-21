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
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
