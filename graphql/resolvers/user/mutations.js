const { sign } = require("jsonwebtoken");
const User = require("../../../models/User.model");
const userMutations = {
  createUser: async (_, { user: { username, password, email } }) => {
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
  },
  updateUser: async (_, { user }, { req }) => {
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
};

export default userMutations;
