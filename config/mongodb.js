const mongoose = require('mongoose');
const db = {};
const URI = process.env.MONGODB_URI;

db.configMongoDb = function () {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Mongo!");
    })
    .catch((err) => {
      console.log(`Error connecting to Mongo: ${err}`);
    });
};

module.exports = db;
