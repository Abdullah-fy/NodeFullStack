
require("dotenv").config();
const { connectToDataBase } = require('./database/mongo/index');
const { APP_CONFIG } = require('./config/app.config');

(async function () {
  console.log(APP_CONFIG.MONGO_DB_URI);
  await connectToDataBase.connectToDB({
    url: APP_CONFIG.MONGO_DB_URI,
    databaseName: APP_CONFIG.DATABASE_NAME,
    callback: () => {
      console.log("Connected to database");
    },
  });
})();
