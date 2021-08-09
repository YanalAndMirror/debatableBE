const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb://admin:root@cluster0-shard-00-00.carpc.mongodb.net:27017,cluster0-shard-00-01.carpc.mongodb.net:27017,cluster0-shard-00-02.carpc.mongodb.net:27017/debatable?ssl=true&replicaSet=atlas-lpr74u-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
