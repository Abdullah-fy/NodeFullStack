const Product =require('../models/product.model');

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

//fetch filtered products
const getFilteredProducts = async({category, minPrice, maxPrice, searchInput}) => {
  try {
    const productsCollection = db.collection('products');
    const query = {};

    //filter by category
    if(category) {
      query.category = category;
  
    }

    //filter by price
    if(minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if(minPrice !== undefined) {
          query.price.$gte = parseFloat(minPrice); // to ensure price is a number
       
      }
      if(maxPrice !== undefined) {
          query.price.$lte = parseFloat(maxPrice);
       
      }
    }
    
    //excute query
    const products = await productsCollection.find(query);
    // console.log("filtered products: ", products);
    if(products) {
      return products; 
    }

  }
  catch(error) {
    console.log('error in get filtered products: ', error);
    throw error;
  }
}

module.exports={
    getProducts,
    AddProduct,
    DeleteProduct,
    UpdateProduct,
    getById,
    getFilteredProducts
};
