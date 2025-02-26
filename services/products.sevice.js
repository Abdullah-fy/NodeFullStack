const { json } = require('express');
const {getProducts,AddProduct,DeleteProduct,UpdateProduct,getById}=require ('../repos/products.repos');
const {upload} =require ('./media.service');
const mongoose=require ('mongoose');


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

//get prod by sel id 
const GetProductsBySeller = async (sellerId) => {
    console.log("Inside GetProductsBySeller service for sellerId:", sellerId);
    return getProductsBySeller(sellerId);
};


const CreateProduct = async (req) => {
    console.log(`Inside createproduct service`);
    console.log(req.body._id);
    console.log(req.files?.images);
    if (!req.files?.images) {
        console.log('error');
        throw new Error("Please upload at least one image");
    }
    else
        console.log('uploaded');

    const imagesArray = Array.isArray(req.files.images) 
    ? req.files.images 
    : [req.files.images];

    const imageUrls = await upload(imagesArray);

    //const productId = new mongoose.Types.ObjectId();

    const productData = {
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        images: imageUrls,
        stockQuantity: Number(req.body.stockQuantity),
        sellerinfo:JSON.parse(req.body.sellerInfo),
        // sellerinfo: {
        //     id: req.body.sellerinfoid, 
        //     name: req.body.sellerinfoname
        // }
    };

    console.log(productData);

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

module.exports={
    GetUproducts,
    CreateProduct,
    deleteProduct,
    updateProduct,
    GetProductById,
    GetProductsBySeller
};

