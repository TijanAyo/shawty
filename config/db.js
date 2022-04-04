const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const mongo = await mongoose.connect(process.env.dbURI);
    console.log("DB connected");
    return mongo;
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDB;
