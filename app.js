const connectDb = require('./db');
const express = require('express');
const apolloServer = require('./graphql/index');
connectDb();
const startServer = async () => {
  const app = express();
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log('server is running on port 4000'));
};
startServer();
