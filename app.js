const connectDb = require("./db");
const express = require("express");
const tokenValidate = require("./middlewares/tokenValidate");
const upload = require("./middlewares/multer");
const cors = require("cors");
const { openViduToken } = require("./util/openvidu");
// SocketIo
const SocketIo = require("./socket/socket");
const socketio = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());

const server = http.createServer(app);
export const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
SocketIo(io);
connectDb();

const apolloServer = require("./graphql/index");
const startServer = async () => {
  await User.updateMany({}, { socketId: [] });

  await apolloServer.start();
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
  server.listen(4000, () => console.log("server is running on port 4000"));
};
startServer();
