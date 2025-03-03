const Product =require('../models/product.model');
const mongoose=require ('mongoose');
const {upload}=require('../services/media.service');
const Inventory=require('../models/Inventory.model');



const getOnlineProducts = async () => {
  try {
    console.log("fetching online products");
    
    // populate productId with all fields 
    const inventory = await Inventory.findOne({ branchLocation: "Online" })

    const invProducts=inventory.products;
      

    console.log("inventory:", inventory);

    if (!inventory || !Array.isArray(inventory.products)) {
      console.log("no inventory found or invalid product list.");
      return [];
    }

    const onlineProducts = invProducts
      .filter((invProduct) => invProduct.stock > 0 && invProduct.productId)
      .map((invProduct) => ({
        _id: invProduct.productId,
        stock: invProduct.stock, 
        createdAt: invProduct.productId.createdAt, 
      }));

    return onlineProducts;
  } catch (error) {
    console.error("error fetching online products:", error);
    throw error;
  }
};

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

const getUnActiveProducts=async ()=>{

  try{
    const products=await Product.find({isActive:false})||[];
    if(products!=[]){
      return products;
    }else{
      throw new Error("No Available Products");
    }

  }catch(error){
    throw new Error("Fail in get Products");
  }
  

}

const getBranchProducts = async (BranchId) => {
  try {
    const inventoryDocs = await Inventory.find({ branchId: BranchId }, { products: 1, _id: 0 });
    console.log(inventoryDocs);
    const productIds = inventoryDocs.flatMap(doc => doc.products.map(product => product.productId));
    console.log(productIds);
    const productsWithDetails = await Product.find({ _id: { $in: productIds } });
    console.log(productsWithDetails);
    return productsWithDetails;
  } catch (error) {
    console.error("Error fetching branch products:", error);
    throw error;
  }
};

module.exports={
  //esraa
  getProducts,
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  getById,
  getProductsBySeller_,


    //fatma
    getFilteredProducts,
    getUnActiveProducts,
    getOnlineProducts,
    getBranchProducts
};
