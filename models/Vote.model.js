const mongoose = require("mongoose");
const VoteSchema = new mongoose.Schema({
  value: { type: Number, enum: [1, 2, 3, 4, 5] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  argue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Argue",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vote", VoteSchema);
