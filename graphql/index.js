const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const apolloServer = new ApolloServer({
  schema,
});

module.exports = apolloServer;
