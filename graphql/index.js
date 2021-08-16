const { ApolloServer } = require("apollo-server-express");
const schema = require("./schema");
const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});

module.exports = apolloServer;
