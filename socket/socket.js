const { verify } = require("jsonwebtoken");
const User = require("../models/User.model");
const SocketIo = (io) => {
  io.on("connection", async (socket) => {
    try {
      let token = socket.handshake.query.token;
      if (token) {
        const TokenData = verify(token, "SuperSecretKey");
        await User.findByIdAndUpdate(TokenData._id, {
          $push: { socketId: socket.id },
        });

        socket.on("disconnect", async () => {
          await User.findByIdAndUpdate(TokenData._id, {
            $pull: { socketId: socket.id },
          });
        });
      }
    } catch (e) {}
  });
};
module.exports = SocketIo;
