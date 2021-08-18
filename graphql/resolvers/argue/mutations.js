import { reconstructNotifications } from "../../../util/notifications";
const Argue = require("../../../models/Argue.model");
const Vote = require("../../../models/Vote.model");
const Debate = require("../../../models/Debate.model");
const User = require("../../../models/User.model");

const argueMutations = {
  createArgue: async (
    _,
    { argue: { content, argueType, debate, parent } },
    { req }
  ) => {
    if (!req.user) return null;
    let checkParicipation = await Argue.findOne({ user: req.user, debate });
    let newArgue = await Argue.create({
      content,
      debate,
      user: req.user,
      parent,
      argueType,
    });
    await Debate.updateOne(
      { _id: debate },
      {
        $inc: {
          argueCount: 1,
          participants: checkParicipation ? 0 : 1,
        },
      }
    );

    reconstructNotifications(newArgue._id);
    return newArgue;
  },
  vote: async (_, { argue, value }, { req }) => {
    if (!req.user) return null;
    let myVote = await Vote.findOneAndDelete({ argue, user: req.user });
    await Vote.create({ value, argue, user: req.user });
    let thisArgue;
    if (!myVote) {
      thisArgue = await Argue.findByIdAndUpdate(
        argue,
        {
          $inc: {
            "votes.amount": value,
            "votes.number": 1,
          },
        },
        { new: true }
      );
      await Debate.updateOne(
        { _id: thisArgue.debate },
        {
          $inc: {
            argueVotes: 1,
          },
        }
      );
    } else {
      thisArgue = await Argue.findByIdAndUpdate(
        argue,
        {
          $inc: {
            "votes.amount": -myVote.value + value,
          },
        },
        { new: true }
      );
    }
    return thisArgue;
  },
};

export default argueMutations;
