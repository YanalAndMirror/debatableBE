const mongoose = require("mongoose");
const ArgueSchema = new mongoose.Schema(
  {
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Please add a Contnet"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    argueType: { type: String, enum: ["agree", "disagree"] },
    debate: { type: mongoose.Schema.Types.ObjectId, ref: "Debate" },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Argue",
      required: false,
    },
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
ArgueSchema.virtual("argues", {
  ref: "Argue",
  localField: "_id",
  foreignField: "parent",
  justOne: false,
});
const Argue = mongoose.model("Argue", ArgueSchema);
module.exports = Argue;
