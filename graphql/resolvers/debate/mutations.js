const Debate = require("../../../models/Debate.model");
const Room = require("../../../models/Room.model");

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
  createRoom: async (_, { room: { title, debate } }, { req }) => {
    if (!req.user) return null;

    let newRoom = await Room.create({
      title,
      user: req.user,
      debate,
    });
    return newRoom;
  },
  roomStatus: async (_, { slug }, { req }) => {
    if (!req.user) return null;
    return await Room.findOneAndUpdate(
      { slug },
      { status: "live" },
      { new: true }
    );
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
  addRoomVote: async (_, { slug, side }, { req }) => {
    if (!req.user) return null;
    await Room.updateOne(
      { slug },
      {
        $pull: { vote: { user: req.user } },
      }
    );
    const newRoom = await Room.findOneAndUpdate(
      { slug },
      {
        $push: { vote: { user: req.user, side } },
      },
      {
        new: true,
      }
    );
    return newRoom;
  },
  updateDebate: async (_, args) => {},
};

export default debateMutations;
