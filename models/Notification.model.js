const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  debate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Debate",
  },
  argue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Argue",
  },
  seen: {
    type: Boolean,
    default: false,
  },
  raw: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
