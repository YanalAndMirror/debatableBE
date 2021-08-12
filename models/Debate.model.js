const mongoose = require('mongoose');
const DebateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  photo: {
    type: String,
  },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  argues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Argue' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Debate = mongoose.model('Debate', DebateSchema);
module.exports = Debate;
