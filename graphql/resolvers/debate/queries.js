const Tag = require("../../../models/Tag.model");
const Debate = require("../../../models/Debate.model");
const Room = require("../../../models/Room.model");

const debateQueries = {
  debates: async (_, { order, start, amount, tag, keyword }) => {
    const orderBy = {};
    const filter = {};
    if (order === "new") orderBy.createdAt = "descending";
    else if (order === "popularity") orderBy.views = "descending";
    else if (order === "hot") orderBy.argueCount = "descending";
    if (tag) filter.tags = tag;
    if (tag) {
      tag = await Tag.findOne({ title: tag });
      if (tag) filter.tags = tag._id;
      else return [];
    }
    if (keyword) {
      filter.title = { $regex: ".*" + keyword + ".*", $options: "i" };
    }
    return await Debate.find(filter)
      .populate("tags room")
      .sort(orderBy)
      .skip(start)
      .limit(amount);
  },
  debate: async (_, { slug }) => {
    let thisDebate = await Debate.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    ).populate("argues room");
    return thisDebate;
  },
  tags: async () => {
    return await Tag.find();
  },
  rooms: async (_, { order, start, amount, tag, keyword }) => {
    const orderBy = {};
    const filter = {};
    if (order === "new") orderBy.createdAt = "descending";
    else if (order === "popularity") orderBy.views = "descending";
    else if (order === "hot") orderBy.argueCount = "descending";
    if (tag) filter.tags = tag;
    if (tag) {
      tag = await Tag.findOne({ title: tag });
      if (tag) filter.tags = tag._id;
      else return [];
    }
    if (keyword) {
      filter.title = { $regex: ".*" + keyword + ".*", $options: "i" };
    }
    return await Room.find(filter)
      .populate("tags debate")
      .sort(orderBy)
      .skip(start)
      .limit(amount);
  },
  room: async (_, { slug }) => {
    let thisRoom = await Room.findOne({ slug }).populate("debate");
    return thisRoom;
  },
};

export default debateQueries;
