const express=require('express');
const orderController=require('../controllers/order.controller');

const router=express.Router();

//1-placed order
router.post("/add",orderController.createOrder)
//2-get all orders ==> for admin 
/*
need to send
page,limit,sortBy,sortedOrder,...filters
*/
router.get("/getAllOrders",orderController.getAllOrders)
//3-get orders by customerId
router.get("/getOrders/:customerId",orderController.getOrdersByCustomerId);
//4-get orders by sellerId
router.get("/getSellerOrders/:sellerId",orderController.getOrdersBySellerId);
//5-updatepatment status ==>cahier
router.patch("/updatepayment",orderController.updatePaymentStatus);
//6-update item in order =>seller and clerk 
router.patch('/update-item',orderController.updateItemStatus);



module.exports=router; 