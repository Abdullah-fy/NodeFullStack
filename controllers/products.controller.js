const {deleteProduct,CreateProduct,GetUproducts,updateProduct,GetProductById, getFilteredProductsServices} =require('../services/products.sevice');
const Product = require('../models/product.model')
class SellerProductsController{
    static async getAllProducts(req,res,next){
        console.log("Before calling products.service getprods");
        try {
            const products= await GetUproducts();
            res.status(200).json(products);
        } catch (execption) {
            console.error("Error in /products route:", exception); 
            res.status(500).json({ message: "Internal server error" });   
        }
    }

    static async updateAProduct(req,res){
        try{
            const updatedproduct=await updateProduct(req.params.id,req.body);
            return res.status(200).json({message: `product updated successfully`});
        }catch(error){
            if(error.message=='product not found')
                return res.status(404).json({ message: error.message });
            console.error("Error in /products route:", error.message);
            return res.status(500).json({message:'updateProducts service error', error: error.message });
        }
    }

    static async AddProduct(req,res){
        try{
            const addedProduct=await CreateProduct(req);
            console.log('controller layer '+addedProduct);
            res.status(200).json({message:'product added successfully'});
        }catch(error){
            res.status(500).json({message:'addProduct service error'});
        }
    };

    static async DeleteProduct(req,res){
        try{
            console.log(req.params.id);
            const deletedProduct=await deleteProduct(String(req.params.id));
            res.status(200).json({message:`product ${deletedProduct} deleted successfully`});
        }catch(error){
            if(error.message=='Product not found')
                res.status(404).json({ message: error.message });
            else
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    };

     static async GetProductByID(req,res){
        try{
            const {id}=req.params;
            const product=await GetProductById(id);
            res.status(200).json(product);
        }catch(error){
            console.log(error.message);
            if(error.message=='Product is not defined'||error.message=='Product not found')
                res.status(404).json({ message: error.message });
            else
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    };

    static async getFilteredProducts(req, res) {
       
        try {
            const { search, category, minPrice, maxPrice } = req.query;
            // console.log("received filters:", req.query); 
        
            let filter = {}; 
        
            if (search) {
                filter.name = { $regex: search, $options: "i" }; 
            }
            if (category) {
                filter.category = category;
            }
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = Number(minPrice);
                if (maxPrice) filter.price.$lte = Number(maxPrice);
            }
        
            let products = await Product.find(filter); 
        
            // console.log("filtered products:", products); 
            res.json(products); 
        } 
        catch (error) {
            console.error("error fetching filtered products:", error);
            res.status(500).json({ message: "Server error" });
        }
        
        
    }
}

module.exports=SellerProductsController;

