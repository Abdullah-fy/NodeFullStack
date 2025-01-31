const express=require('express');
const CartController=require('../controllers/cart.controller');

const router=express.Router();

//add item to cart
router.post('/add',CartController.addToCart);
//get cart by customer id
router.get('/:customerId',CartController.getCart);
//Remove item from cart
router.delete('/remove/:customerId/:productId', CartController.removeFromCart);
//decrese item from cart 
router.post('/dec',CartController.decfromToCart);
//clear cart
router.delete('/clear/:customerId',CartController.clearCart);

module.exports=router;