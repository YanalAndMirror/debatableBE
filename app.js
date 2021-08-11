/**
 * @Octowl Do you have `db.js` yet?
 */
const connectDb = require("./db");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express"); // gql is unused
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose"); // unused import

connectDb();

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log("server is running on port 4000"));
};
startServer();
