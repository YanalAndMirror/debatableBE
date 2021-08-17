const Debate = require('../../../models/Debate.model');
const debateQueries = {
  debates: async (_, { order, start, amount, tag }) => {
    const orderBy = {};
    const filter = {};
    if (order === "new") orderBy.createdAt = "descending";
    else if (order === "popularity") orderBy.views = "asc";
    else if (order === "hot") orderBy.argueCount = "asc";
    if (tag) filter.tags = tag;
    return await Debate.find(filter)
      .populate("tags")
      .sort(orderBy)
      .skip(start)
      .limit(amount);
  },
  debate: async (_, { slug }) => {
    let thisDebate = await Debate.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    ).populate("argues");
    return thisDebate;
  },
};

export default debateQueries;
