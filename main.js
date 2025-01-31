require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import CORS
const { connectToDataBase } = require("./database/mongo/index");
const { APP_CONFIG } = require("./config/app.config");
const cartRoutes = require("./routes/cart.routes");
const { authenticateToken } = require('./middlewares/authontication.middleware');


const app = express();
const PORT = APP_CONFIG.PORT || 3000;




app.use(cors()); // Enable CORS
app.use(express.json());
//add your rout here......................
app.use("/api/cart", cartRoutes);

// Connect to Database and Start Server
(async function () {
  try {
    console.log(`Connecting to database at ${APP_CONFIG.MONGO_DB_URI}...`);

    await connectToDataBase({
      url: APP_CONFIG.MONGO_DB_URI,
      databaseName: APP_CONFIG.DATABASE_NAME,
      callback: () => console.log("✅ Connected to database"),
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);

  }
})();

// Handle graceful shutdown
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down...");
    await connectToDataBase.close(); // Close DB connection if applicable
    process.exit(0);
});
