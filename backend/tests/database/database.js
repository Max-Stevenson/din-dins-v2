const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = await MongoMemoryServer.create();

exports.dbConnect = async () => {
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  mongoose.connect(uri, mongooseOpts).catch(err => {console.error(err)});
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
