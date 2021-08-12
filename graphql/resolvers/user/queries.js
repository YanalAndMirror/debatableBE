import User from '../../../models/User.model';

const userQueries = {
  users: async (_, args) => {
    return await User.find();
  },
  user: async (_, args) => {},
};

export default userQueries;
