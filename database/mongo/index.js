const mongoose = require('mongoose');

const connectToDB = async ({ url, databaseName, callback }) => {
  try {
    await mongoose.connect(url, {
      dbName: databaseName,
    });
    process.nextTick(() => {
      callback();
    });
  } catch (error) {
    console.error('Error connecting to DB:', error.message);
    throw new Error("error connection to DB");
  }
};

module.exports = { connectToDataBase: { connectToDB } };

