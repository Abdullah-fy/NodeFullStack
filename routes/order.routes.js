const express=require('express');
const orderController=require('../controllers/order.controller');

const router=express.Router();

//placed order
router.post("/add",orderController.createOrder)
//get all orders ==> for admin 
/*
need to send
page,limit,sortBy,sortedOrder,...filters
*/
router.get("/getAllOrders",orderController.getAllOrders)



module.exports=router; 