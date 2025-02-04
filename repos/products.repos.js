const Product =require('../models/product.model');
const mongoose=require ('mongoose');
const {upload}=require('../services/media.service');



const getProducts= async()=>{
    try{
        const products=await Product.find();
        console.log("users.repos getprod result:", products);
        if(products)
          return products;
    }
    catch(error)
    {
        console.error("Error in prod.repos getprod:", error);
        throw error; 
    }
};

const getById = async (id) => {
  return await Product.findById(id);
};



const AddProduct=async (productData) =>{
  console.log("start of add product ");
    try {

        console.log("inside addpro2 ");
        const newProduct = new Product(productData);
        console.log('p data passed '+productData);
        console.log('productData from shcesma '+newProduct );
    
        return await newProduct.save();
      } catch (error) {
        console.error("Database save error:", error);
        throw new Error(`Failed to create product: ${error.message}`);    
      }
};


const DeleteProduct= async(id)=>{
    try {
        const deletedproduct = await Product.findByIdAndDelete(id);
        if (!deletedproduct) {
          throw new Error('product not found');
        }
        return deletedproduct;
      } catch (error) { 
        console.error("Database save error:", error);
        throw new Error(`Failed to delete product: ${error.message}`);  
      }
}

const UpdateProduct=async(id,ProductData)=>{
    try{
       const updatedproduct= await Product.findByIdAndUpdate({_id:id},ProductData,{ new: true });
       if (!updatedproduct) {
        throw new Error('product not found');
      }
      console.log(updatedproduct);
      return updatedproduct;
    }catch(error){
      throw new Error(error.message); 
    }
}

module.exports={
    getProducts,
    AddProduct,
    DeleteProduct,
    UpdateProduct,
    getById
};
