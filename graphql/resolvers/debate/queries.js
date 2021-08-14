const Debate = require("../../../models/Debate.model");
const debateQueries = {
  debates: async () => {
    return await Debate.find();
  },
  debate: async (_, args) => {},
};

export default debateQueries;
