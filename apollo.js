const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const userTypes = require('./graphql/typeDefs/user.types');
const userResolvers = require('./graphql/resolvers/user.resolvers');

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
  typeDefs: [userTypes.typeDefs],
  resolvers: merge(userResolvers),
});

module.exports = schema;
