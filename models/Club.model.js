const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const ClubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    slug: { type: String, slug: "name", unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    inviteType: { type: String, enum: ["any", "adminOnly"] },
    inviteLink: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const Club = mongoose.model("Club", ClubSchema);
module.exports = Club;
