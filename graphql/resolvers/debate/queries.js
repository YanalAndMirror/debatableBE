import { io } from '../../../app';

const Tag = require('../../../models/Tag.model');
const Debate = require('../../../models/Debate.model');
const Room = require('../../../models/Room.model');
const Club = require('../../../models/Club.model');

const debateQueries = {
  debates: async (_, { order, start, amount, tag, keyword, club }, { req }) => {
    io.sockets.to('hadidi2').emit('notifcation', 'message');
    const orderBy = {};
    const filter = {};
    if (order === 'new') orderBy.createdAt = 'descending';
    else if (order === 'popularity') orderBy.views = 'descending';
    else if (order === 'hot') orderBy.argueCount = 'descending';
    if (tag) filter.tags = tag;
    if (tag) {
      tag = await Tag.findOne({ title: tag });
      if (tag) filter.tags = tag._id;
      else return [];
    }
    if (keyword) {
      filter.title = { $regex: '.*' + keyword + '.*', $options: 'i' };
    }
    let myClub = await Club.findOne({ slug: club });
    if (myClub) {
      if (!myClub.users.includes(req.user)) return null;
      filter.club = myClub._id;
    } else {
      filter.club = null;
    }
    return await Debate.find(filter)
      .populate('tags room')
      .sort(orderBy)
      .skip(start)
      .limit(amount);
  },
  debate: async (_, { slug }, { req }) => {
    let thisDebate = await Debate.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    ).populate('argues room user');
    if (thisDebate.club) {
      let myClub = await Club.findById(thisDebate.club);
      if (myClub && !myClub.users.includes(req.user)) return null;
    }
    return thisDebate;
  },
  tags: async () => {
    return await Tag.find();
  },
  rooms: async (_, { order, start, amount, tag, keyword }) => {
    const orderBy = {};
    const filter = {};
    if (order === 'new') orderBy.createdAt = 'descending';
    else if (order === 'popularity') orderBy.views = 'descending';
    else if (order === 'hot') orderBy.argueCount = 'descending';
    if (tag) filter.tags = tag;
    if (tag) {
      tag = await Tag.findOne({ title: tag });
      if (tag) filter.tags = tag._id;
      else return [];
    }
    if (keyword) {
      filter.title = { $regex: '.*' + keyword + '.*', $options: 'i' };
    }
    let myRooms = await Room.find(filter)
      .populate({
        path: 'debate',
        populate: { path: 'tags' },
      })
      .sort(orderBy)
      .skip(start)
      .limit(amount);

    myRooms = myRooms.filter((room) => {
      return room.live === true;
    });
    return myRooms;
  },
  room: async (_, { slug }) => {
    let thisRoom = await Room.findOne({ slug }).populate({
      path: 'debate',
      populate: { path: 'tags' },
    });
    return thisRoom;
  },
};

export default debateQueries;
