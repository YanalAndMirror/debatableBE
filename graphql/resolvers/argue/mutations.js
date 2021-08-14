const Argue = require("../../../models/Argue.model");

const argueMutations = {
  createArgue: async (
    _,
    { argue: { content, argueType, debate, parent } },
    { req }
  ) => {
    if (!req.user) return null;
    let newArgue = await Argue.create({
      content,
      debate,
      user: req.user,
      parent,
      argueType,
    });
    return newArgue;
  },
  updateArgue: async (_, args) => {},
};

export default argueMutations;
