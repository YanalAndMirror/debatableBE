const connectDb = require("./db");
const express = require("express");
const apolloServer = require("./graphql/index");
const tokenValidate = require("./middlewares/tokenValidate");
connectDb();
const startServer = async () => {
  const app = express();
  await apolloServer.start();
  app.use(tokenValidate);

  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log("server is running on port 4000"));
};
startServer();
