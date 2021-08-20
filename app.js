const connectDb = require("./db");
const express = require("express");
const apolloServer = require("./graphql/index");
const tokenValidate = require("./middlewares/tokenValidate");
const upload = require("./middlewares/multer");
const cors = require("cors");
const { openViduToken } = require("./util/openvidu");

connectDb();

const startServer = async () => {
  const app = express();
  await apolloServer.start();
  app.use(cors());
  app.use(tokenValidate);
  app.use("/upload", express.static("upload"));
  app.use(express.json());
  app.post("/uploadImage", upload.single("file"), (req, res, next) => {
    res
      .status(201)
      .json(`http://${req.get("host")}/upload/${req.file.filename}`);
  });
  app.post("/openViduToken", openViduToken);

  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log("server is running on port 4000"));
};
startServer();
