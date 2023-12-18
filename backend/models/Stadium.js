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
  seatsPerRow: {
    type: Number,
    required: true,
  },
});

const Stadium = mongoose.model("Stadium", stadiumSchema);

export default Stadium;
