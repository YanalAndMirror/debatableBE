const mongoose = require('mongoose');
const ArgueSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  argues: [this],
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  argueType: { type: String, enum: ['AGREE', 'DISAGREE'] },
  debate: { type: mongoose.Schema.Types.ObjectId, ref: 'Debate' },
});
const Argue = mongoose.model('Argue', ArgueSchema);
module.exports = Argue;
