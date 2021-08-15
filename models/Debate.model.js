const mongoose = require("mongoose");
const DebateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    views: {
      type: Number,
      default: 1,
    },
    photo: {
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
DebateSchema.virtual("ArguesCount", {
  ref: "Argue",
  localField: "_id",
  foreignField: "debate",
  count: true,
});
const Debate = mongoose.model("Debate", DebateSchema);
module.exports = Debate;
