const { sign } = require("jsonwebtoken");
const User = require("../../../models/User.model");
const userMutations = {
  signup: async (_, { user: { username, password, email } }) => {
    try {
      const thisUser = await User.create({ username, password, email });
      const tokenData = { _id: thisUser._id };
      // return token
      let token = sign(tokenData, "SuperSecretKey", {
        expiresIn: 60 * 60 * 7 * 1000,
      });
      return {
        token,
        user: thisUser,
      };
    } catch (e) {
      return null;
    }
  },
  updateUser: async (_, { user }, { req }) => {
    if (!req.user) return null;
    const thisUser = await User.findOneAndUpdate({ _id: req.user }, user, {
      new: true,
    });
    return thisUser;
  },
  signin: async (_, { username, password }, { req }) => {
    const thisUser = await User.findOne({ username });
    if (thisUser && thisUser.password === password) {
      const tokenData = { _id: thisUser._id };
      let token = sign(tokenData, "SuperSecretKey", {
        expiresIn: 60 * 60 * 7 * 1000,
      });
      return {
        token,
        user: thisUser,
      };
    }
    return null;
  },
  follow: async (_, { debate }, { req }) => {
    if (!req.user) return null;
    return await User.findOneAndUpdate(
      { _id: req.user, followed: { $ne: debate } },
      { $push: { followed: debate } },
      {
        new: true,
      }
    );
  },
  clearNotifications: async (_, __, { req }) => {
    if (!req.user) return null;
    return await User.findOneAndUpdate(
      { _id: req.user },
      {
        $set: {
          "notifications.$[].seen": true,
        },
      },
      {
        new: true,
      }
    );
  },
};

export default userMutations;
