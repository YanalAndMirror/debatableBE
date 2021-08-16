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
DebateSchema.virtual("arguesCount", {
  ref: "Argue",
  localField: "_id",
  foreignField: "debate",
  count: true,
});
DebateSchema.virtual("argues", {
  ref: "Argue",
  localField: "_id",
  foreignField: "debate",
  justOne: false,
});
const Debate = mongoose.model("Debate", DebateSchema);
module.exports = Debate;
