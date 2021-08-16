const Argue = require("../../../models/Argue.model");
const Vote = require("../../../models/Vote.model");

const argueMutations = {
  createArgue: async (
    _,
    { argue: { content, argueType, debate, parent } },
    { req }
  ) => {
    if (!req.user) return null;
    let newArgue = await Argue.create({
      content,
      debate,
      user: req.user,
      parent,
      argueType,
    });
    return newArgue;
  },
  vote: async (_, { argue, value }, { req }) => {
    if (!req.user) return null;
    let myVote = await Vote.findOneAndDelete({ argue, user: req.user });
    await Vote.create({ value, argue, user: req.user });
    if (!myVote) {
      return await Argue.findByIdAndUpdate(
        argue,
        {
          $inc: {
            "votes.amount": value,
            "votes.number": 1,
          },
        },
        { new: true }
      );
    }

    return await Argue.findByIdAndUpdate(
      argue,
      {
        $inc: {
          "votes.amount": -myVote.value + value,
        },
      },
      { new: true }
    );
  },
};

export default argueMutations;
