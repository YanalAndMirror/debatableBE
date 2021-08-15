const Debate = require("../../../models/Debate.model");
const debateQueries = {
  debates: async () => {
    return await Debate.find().populate("ArguesCount");
  },
  debate: async (_, args) => {},
};

export default debateQueries;
