const express=require('express');
const authConrroller = require('../controllers/authController');
const SellerProductsController=require ('../controllers/products.controller');

const router=express.Router();

router.get('/products',authConrroller.protect, authConrroller.restrictTo('seller'),SellerProductsController.getAllProducts); //seller id 
router.put('/products/:id',authConrroller.protect, authConrroller.restrictTo('seller'),SellerProductsController.updateAProduct);
router.post('/products',authConrroller.protect, authConrroller.restrictTo('seller'),SellerProductsController.AddProduct);
router.delete('/products/:id',authConrroller.protect, authConrroller.restrictTo('seller'),SellerProductsController.DeleteProduct);
router.get('/products/:id',SellerProductsController.GetProductByID); //check seller id 
//router.get('/products/seller/:sellerId', SellerProductsController.getProductsBySeller);
//router.patch('/products/:id/stock', SellerProductsController.updateStock);
router.get('/filteredProducts',SellerProductsController.getFilteredProducts);
router.get("/onlineProducts", SellerProductsController.getOnlineProducts);


module.exports=router;