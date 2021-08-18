import User from "../../../models/User.model";

const userQueries = {
  users: async (_, args) => {
    return await User.find();
  },
  user: async (_, __, { req }) => {
    if (req.user) {
      const thisUser = await User.findById(req.user)
        .populate({
          path: "notifications",
          populate: {
            path: "debate",
          },
        })
        .populate("debates votesCount ")
        .populate({ path: "argues", populate: "debate" });
      thisUser.arguesCount = thisUser.argues.length;
      thisUser.otherDebates = [
        ...new Set(thisUser.argues.map((argue) => argue.debate)),
      ];
      return thisUser;
    }
  },
};

export default userQueries;
