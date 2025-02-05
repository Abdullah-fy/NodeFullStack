const express=require('express');
const orderController=require('../controllers/order.controller');

const router=express.Router();

//placed order
router.post("/add",orderController.createOrder)



module.exports=router; 