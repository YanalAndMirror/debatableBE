const mongoose = require("mongoose");
const DebateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  photo: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Debate = mongoose.model("Debate", DebateSchema);
module.exports = Debate;
