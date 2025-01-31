require("dotenv").config();
const { connectToDataBase } = require('./database/mongo/index');
const { APP_CONFIG } = require('./config/app.config');
const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/user.controller');
const orderController = require('./controllers/order.controller');
const { authenticateToken } = require('./middlewares/authontication.middleware');

(async function () {
  try{
    await connectToDataBase.connectToDB({
      url: APP_CONFIG.MONGO_DB_URI,
      databaseName: APP_CONFIG.DATABASE_NAME,
      callback: () => {
        console.log("Connected to database");
        const app = express();
        app.use(express.json());

        app.post('/register', authController.registerUserController);
        app.post('/login', authController.loginUserController);

        app.post('/orders', authenticateToken, orderController.createOrderController);
        app.get('/orders', authenticateToken, orderController.getAllOrdersController);
        app.get('/orders/:id', authenticateToken, orderController.getOrderByIdController);
        app.put('/orders/:id', authenticateToken, orderController.updateOrderController);
        app.delete('/orders/:id', authenticateToken, orderController.deleteOrderController);


        app.post('/users', userController.createUserController);
        app.get('/users/:email', userController.getUserByEmailController);
        app.put('/users/:id', userController.updateUserController);
        app.delete('/users/:id', userController.deleteUserController);

        app.listen(APP_CONFIG.HTTP_PORT, '0.0.0.0', ()=>{
          console.log(`app listen on port ${APP_CONFIG.HTTP_PORT}`);
        })
      },
    });
  }catch(error){
    console.log("could not connect");
   
  }
})();
