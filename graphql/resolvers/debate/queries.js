const Debate = require("../../../models/Debate.model");
const debateQueries = {
  debates: async (_, { order }) => {
    const orderBy = { createdAt: "descending" };
    if (order === "new") orderBy.createdAt = "descending";
    else if (order === "popularity") orderBy.views = "asc";
    else if (order === "hot") orderBy.argueCount = "asc";

    return await Debate.find().sort(orderBy);
  },
  debate: async (_, { slug }) => {
    let thisDebate = await Debate.findOne({ slug }).populate("argues");
    return thisDebate;
  },
};

export default debateQueries;
