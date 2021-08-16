const mongoose = require("mongoose");
const TagSchema = new mongoose.Schema({
  title: String,
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tag", TagSchema);
