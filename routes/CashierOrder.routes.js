const express=require('express');
const orderController=require('../controllers/CashierOrder.Controller');
//const AuthController=require('../controllers/authController')
const router=express.Router();

//1-create order
router.post("/add",orderController.createOrder);
//2-find all order =>super Admin
router.get("/getAllOrders",orderController.getAllOrders)
//3-get order by casherid
router.get("/getOrders/:CashierId",orderController.getOrdersByCashierId);

module.exports=router; 