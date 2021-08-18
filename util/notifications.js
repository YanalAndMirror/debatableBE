const Argue = require("../models/Argue.model");
const User = require("../models/User.model");
const Notification = require("../models/Notification.model");

export const reconstructNotifications = async (argue) => {
  const thisArgue = await Argue.findById(argue).populate("user debate");
  const followers = await User.find({
    followed: thisArgue.debate._id,
    _id: { $ne: thisArgue.user._id },
  });
  const previousNotifications = await Notification.find({
    user: { $in: [followers.map((f) => f._id)] },
    seen: false,
    debate: thisArgue.debate._id,
  });
  await Notification.deleteMany({
    user: { $in: [followers.map((f) => f._id)] },
    seen: false,
    debate: thisArgue.debate._id,
  });
  const notifcationsList = [];
  followers.forEach((follower) => {
    let followerNotification = previousNotifications.find(
      (n) => n.user.toString() === follower._id.toString()
    );
    let raw;
    if (followerNotification) {
      raw = followerNotification.raw;
      if (raw.user !== thisArgue.user.username) raw.others++;
      raw.arguesNumber++;
    } else
      raw = {
        user: thisArgue.user.username,
        others: 0,
        arguesNumber: 1,
        title: thisArgue.debate.title,
      };
    const text =
      raw.user +
      " " +
      (raw.others === 1
        ? "and 1 other "
        : raw.others > 0
        ? `and ${raw.others} others `
        : "") +
      "added " +
      (raw.arguesNumber === 1
        ? "an arguemnt"
        : raw.arguesNumber + " arguemnts") +
      " to " +
      raw.title;
    notifcationsList.push({
      user: follower._id,
      text,
      debate: thisArgue.debate._id,
      argue: thisArgue._id,
      raw,
    });
    // Sent socket.io/Subscription -> to frontEnd
  });
  await Notification.create(notifcationsList);
};
