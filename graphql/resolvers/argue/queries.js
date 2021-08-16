const Argue = require("../../../models/Argue.model");

const argueQueries = {
  argues: async (_, { filter }) => {
    const argues = await Argue.find(filter).populate("argues");
    return argues;
  },
};

export default argueQueries;
