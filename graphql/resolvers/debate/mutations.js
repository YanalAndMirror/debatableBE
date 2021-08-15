const Debate = require("../../../models/Debate.model");
const Argue = require("../../../models/Argue.model");

const debateMutations = {
  createDebate: async (_, { debate: { title, argue, photo } }, { req }) => {
    if (!req.user) return null;
    let newDebate = await Debate.create({ title, photo, user: req.user });
    await Argue.create({
      content: argue,
      debate: newDebate._id,
      user: req.user,
    });
    return newDebate;
  },
  addDebateView: async (_, { debate }) => {
    return await Debate.findByIdAndUpdate(
      debate,
      { $inc: { views: 1 } },
      { new: true }
    );
  },
  updateDebate: async (_, args) => {},
};

export default debateMutations;
