import User from "../../../models/User.model";
import Club from "../../../models/Club.model";

const userQueries = {
  users: async () => {
    return await User.find();
  },
  user: async (_, __, { req }) => {
    if (!req.user) return null;
    const thisUser = await User.findById(req.user)
      .populate({
        path: "notifications",
        populate: {
          path: "debate",
        },
      })
      .populate("debates votesCount clubs")
      .populate({ path: "argues", populate: "debate" });
    thisUser.arguesCount = thisUser.argues.length;
    thisUser.otherDebates = [
      ...new Set(thisUser.argues.map((argue) => argue.debate)),
    ];
    return thisUser;
  },
};

export default userQueries;
