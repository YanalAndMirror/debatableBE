import Debate from '../../../models/User.model';

const debateQueries = {
  debates: async (_, args) => {
    return await Debate.find();
  },
  debate: async (_, args) => {},
};

export default debateQueries;
