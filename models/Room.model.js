const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    status: {
      type: String,
      default: "Off",
    },
    vote: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        side: { type: String, enum: ["right", "left"] },
      },
    ],
    debate: { type: mongoose.Schema.Types.ObjectId, ref: "Debate" },

    slug: { type: String, slug: "title", unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
RoomSchema.virtual("live").get(function () {
  if ((Date.now() - this.updatedAt.getTime()) / 1000 > 15 * 60) return false;
  else return true;
});
const Debate = mongoose.model("Room", RoomSchema);
module.exports = Debate;
