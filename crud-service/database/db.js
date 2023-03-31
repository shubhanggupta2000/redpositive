import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-9drc0yf-shard-00-00.pb3jbtb.mongodb.net:27017,ac-9drc0yf-shard-00-01.pb3jbtb.mongodb.net:27017,ac-9drc0yf-shard-00-02.pb3jbtb.mongodb.net:27017/CRUD-APPLICATION?ssl=true&replicaSet=atlas-ugpiai-shard-0&authSource=admin&retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log('Error: ', error.message);
  }
};

export default Connection;
