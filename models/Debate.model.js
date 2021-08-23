const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const DebateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    slug: { type: String, slug: "title", unique: true },
    views: {
      type: Number,
      default: 1,
    },
    photo: {
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    argueCount: {
      type: Number,
      default: 1,
    },
    argueVotes: {
      type: Number,
      default: 0,
    },
    participants: {
      type: Number,
      default: 1,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
DebateSchema.virtual("argues", {
  ref: "Argue",
  localField: "_id",
  foreignField: "debate",
  justOne: false,
});
DebateSchema.virtual("room", {
  ref: "Room",
  localField: "_id",
  foreignField: "debate",
  justOne: true,
});
const Debate = mongoose.model("Debate", DebateSchema);
module.exports = Debate;
