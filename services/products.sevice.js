const {getProducts, AddProduct, DeleteProduct, UpdateProduct, getById, getFilteredProducts,getUnActiveProducts}=require ('../repos/products.repos');
const {upload} =require ('./media.service');
const mongoose=require ('mongoose');
const Product = require('../models/product.model');
const Stock = require('../models/stock.model');

const GetUproducts=async ()=>{
    console.log("Inside getproducts service");
    return getProducts();
};

const GetProductById = async (id) => {
    const product = await getById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
};

const CreateProduct = async (req) => {
    console.log("Inside createproduct service");
    if (!req.files?.images) {
        throw new Error("Please upload at least one image");
    }

    const imagesArray = Array.isArray(req.files.images) 
    ? req.files.images 
    : [req.files.images];

    const imageUrls = await upload(imagesArray);
    const productId = new mongoose.Types.ObjectId();


    const stockData = {
        productId: productId,
        supplierId: req.body.supplierId,
        status: 'approved'
    };

    const newStock = new Stock(stockData);
    await newStock.save();

    const productData = {
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        images: imageUrls,
        stockQuantity: Number(req.body.stockQuantity),
        stockId: newStock._id,
        isActive: true
    };

    console.log('from service :'+productData);

    return AddProduct(productData);
};

const deleteProduct = async (id) => {
    console.log("Inside delete product service");
    const deletedproduct= DeleteProduct(id);
    if(!deletedproduct){
        throw new Error('Product not found');
    }
    return deletedproduct;
};

const updateProduct=async(id, data)=>{
    console.log("Inside delete product service");
    const updatedproduct= UpdateProduct(id,data);
    if(!updatedproduct)
        throw new Error('product not found');
    return updatedproduct;
};

//fetch filtered products
const getFilteredProductsServices = async (filter) => {
    try {
        const products = await Product.find(filter);
        return products;
    }
    catch(error) {
        console.log('error in get filtered products: ', error);
    }
}

const getAllProductUnactive=async ()=>{
    try{
        const AllProducts= getUnActiveProducts();
        return AllProducts;
    }catch(error){
            throw new Error(error);
    }
   
}
const SoftDeleteProduct=async (id)=>{
    try{
      const productTodelete= await  Product.findByIdAndUpdate(
            id,
            { isActive: false }, 
            { new: true }  
        )
        if(!productTodelete){
            throw new Error(`couldnt find product with id :${id}`)
        }
        return true;
    }catch(error){
        throw new Error("Fialed To Update Product ")
    }
}
const DeleteAllproductsSeller=async (seller_id)=>{
    try{
        const DeletedProducts=await Product.updateMany({"sellerinfo.id":seller_id}, {$set: { isActive: false }});
        if(DeletedProducts.modifiedCount==0){
            throw new Error("no  any Products deleted for this Seller")
        }
        return {success:true ,message :"Products Deleted Successfuly"};
    }catch(error){
        throw new Error("couldnt connct to DB Server ");
    }
}
module.exports={
    GetUproducts,
    CreateProduct,
    deleteProduct,
    updateProduct,
    GetProductById,
    getFilteredProductsServices,
    getAllProductUnactive,
    SoftDeleteProduct,
    DeleteAllproductsSeller
};

