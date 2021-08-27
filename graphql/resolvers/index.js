const { argueQueries, argueMutations } = require("./argue");
const { debateQueries, debateMutations } = require("./debate");
const { userQueries, userMutations } = require("./user");

const resolvers = {
  Query: {
    ...argueQueries,
    ...debateQueries,
    ...userQueries,
  },
  Mutation: {
    ...argueMutations,
    ...debateMutations,
    ...userMutations,
  },
};

module.exports = resolvers;
