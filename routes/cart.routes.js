const express=require('express');
const CartController=require('../controllers/cart.controller');

const router=express.Router();

//add item to cart
router.post('/add',CartController.addToCart);
//get cart by customer id
router.get('/:customerId',CartController.getCart);
//Remove item from cart
router.delete('/remove', CartController.removeFromCart);
//decrese item from cart 
router.patch('/dec',CartController.decfromToCart);
//clear cart
router.delete('/clear',CartController.clearCart);


module.exports=router;