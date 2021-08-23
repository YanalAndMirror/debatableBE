import { findOneAndUpdate } from "../../../models/User.model";

const { sign } = require("jsonwebtoken");
const User = require("../../../models/User.model");
const Club = require("../../../models/Club.model");

const Notification = require("../../../models/Notification.model");

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
  unfollow: async (_, { debate }, { req }) => {
    if (!req.user) return null;
    return await User.findOneAndUpdate(
      { _id: req.user },
      { $pull: { followed: debate } },
      {
        new: true,
      }
    );
  },
  clearNotifications: async (_, __, { req }) => {
    if (!req.user) return null;
    await Notification.updateMany({ seen: false }, { seen: true });
    return await User.findById(req.user).populate({
      path: "notifications",
      populate: {
        path: "debate",
      },
    });
  },
  createClub: async (_, { name, photo, inviteType }, { req }) => {
    if (!req.user) return null;

    let inviteLink = "";
    let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 11; i++) {
      inviteLink += c.charAt(Math.floor(Math.random() * c.length));
    }

    let thisClub = await Club.create({
      name,
      photo,
      inviteType,
      admin: req.user,
      users: [req.user],
      inviteLink,
    });
    return thisClub;
  },
  useInviteLink: async (_, { inviteLink }, { req }) => {
    if (!req.user) return null;
    let myClub = await findOneAndUpdate(
      { inviteLink },
      {
        $push: { users: req.user },
      },
      { new: true }
    );
    return myClub;
  },
  updateInviteLink: async (_, { slug }, { req }) => {
    if (!req.user) return null;
    let myClub = await Club.findOne({ slug });

    if (!myClub.users.includes(req.user)) return null;
    if (myClub.inviteType === "adminOnly" && myClub.admin !== req.user)
      return null;
    let inviteLink = "";
    let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 11; i++) {
      inviteLink += c.charAt(Math.floor(Math.random() * c.length));
    }
    return await findOneAndUpdate({ slug }, { inviteLink }, { new: true });
  },
  removeFromClub: async (_, { user, slug }, { req }) => {
    if (!req.user) return null;
    let myClub = await Club.findOne({ slug });
    if (!myClub.users.includes(user)) return null;
    // admin or himself can remove
    if (myClub.admin !== req.user && user !== req.user) return null;

    return await findOneAndUpdate(
      { inviteLink },
      {
        $pull: { users: user },
      },
      { new: true }
    );
  },
};

export default userMutations;
