const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [8, "password can not be less than 8 characters"],
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    trim: true,
    lowercase: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  followed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Debate",
    },
  ],
});
UserSchema.virtual("notifications", {
  ref: "Notification",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});
UserSchema.virtual("debates", {
  ref: "Debate",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});
UserSchema.virtual("argues", {
  ref: "Argue",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});
UserSchema.virtual("votesCount", {
  ref: "Vote",
  localField: "_id",
  foreignField: "user",
  count: true,
});
UserSchema.virtual("clubs", {
  ref: "Club",
  localField: "_id",
  foreignField: "users",
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
