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
  clubs: async (_, __, { req }) => {
    const otherClubs = await Club.find({
      inviteType: "any",
      users: { $ne: req.user },
    });
    const myClubs = await Club.find({ users: req.user });

    return {
      myClubs,
      otherClubs,
    };
  },
  club: async (_, { slug }, { req }) => {
    if (!req.user) return null;
    if (slug === "public") return null;
    const myClub = await Club.findOne({ users: req.user, slug }).populate(
      "users"
    );
    if (req.user !== myClub.admin.toString()) myClub.inviteLink = null;
    return myClub;
  },
};

export default userQueries;
