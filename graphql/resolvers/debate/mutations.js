const Debate = require("../../../models/Debate.model");
const Argue = require("../../../models/Argue.model");
const Tag = require("../../../models/Tag.model");

const debateMutations = {
  createDebate: async (
    _,
    { debate: { title, argue, photo, tags } },
    { req }
  ) => {
    if (!req.user) return null;
    let newDebate = await Debate.create({
      title,
      photo,
      user: req.user,
      tags,
    });
    await Argue.create({
      content: argue,
      debate: newDebate._id,
      user: req.user,
    });
    newDebate.arguesCount = 1;
    return newDebate;
  },
  addDebateView: async (_, { debate }) => {
    return await Debate.findByIdAndUpdate(
      debate,
      { $inc: { views: 1 } },
      { new: true }
    );
  },
  addTag: async (_, { title, photo }) => {
    return await Tag.create({ title, photo });
  },
  updateDebate: async (_, args) => {},
};

export default debateMutations;
