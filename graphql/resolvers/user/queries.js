import User from "../../../models/User.model";

const userQueries = {
  users: async (_, args) => {
    return await User.find();
  },
  user: async (_, __, { req }) => {
    if (req.user) {
      const thisUser = await User.findById(req.user);
      return thisUser;
    }
  },
};

export default userQueries;
