const Debate = require('../../../models/Debate.model');
const debateQueries = {
  debates: async (_, { order, start, amount }) => {
    const orderBy = {};
    if (order === "new") orderBy.createdAt = "descending";
    else if (order === "popularity") orderBy.views = "asc";
    else if (order === "hot") orderBy.argueCount = "asc";

    return await Debate.find().sort(orderBy).skip(start).limit(amount);
  },
  debate: async (_, { slug }) => {
    let thisDebate = await Debate.findOne({ slug }).populate("argues");
    return thisDebate;
  },
};

export default debateQueries;
