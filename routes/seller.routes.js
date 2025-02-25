const express=require('express');
const SellerProductsController=require ('../controllers/products.controller');

const router=express.Router();

router.get('/products',SellerProductsController.getAllProducts); //seller id 
router.put('/products/:id',SellerProductsController.updateAProduct);
router.post('/products',SellerProductsController.AddProduct);
router.delete('/products/:id',SellerProductsController.DeleteProduct);
router.get('/products/:id',SellerProductsController.GetProductByID); //check seller id 
router.get('/filteredProducts', SellerProductsController.getFilteredProducts);
router.get("/onlineProducts", SellerProductsController.getOnlineProducts);


module.exports=router;