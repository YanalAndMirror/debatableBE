const Debate = require('../../../models/Debate.model');
const debateQueries = {
  debates: async () => {
    return await Debate.find().populate("ArguesCount");
  },
  debate: async (_, { slug }) => {
    let thisDebate = await Debate.findOne({ slug }).populate("argues");
    return thisDebate;
  },
};

export default debateQueries;
