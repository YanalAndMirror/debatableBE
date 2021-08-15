import Argue from '../../../models/User.model';

const argueQueries = {
  arguements: async (_, args) => {
    return Argue.find();
  },
  argue: async (_, args) => {},
};

export default argueQueries;
