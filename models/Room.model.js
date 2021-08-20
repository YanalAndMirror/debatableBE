const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    status: {
      type: String,
      defualt: "Off",
    },

    slug: { type: String, slug: "title", unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);
const Debate = mongoose.model("Room", RoomSchema);
module.exports = Debate;
