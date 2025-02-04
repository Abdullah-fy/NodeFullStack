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

const CreateProduct = async (req) => {
    console.log("Inside createproduct service");
    if (!req.files?.images) {
        throw new Error("Please upload at least one image");
    }

    const imagesArray = Array.isArray(req.files.images) 
    ? req.files.images 
    : [req.files.images];

    const imageUrls = await upload(imagesArray);
    //const productId = new mongoose.Types.ObjectId();

    const productData = {
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        images: imageUrls,
        stockQuantity: Number(req.body.stockQuantity),
        sellerinfo: req.body.sellerinfo,
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

module.exports={
    GetUproducts,
    CreateProduct,
    deleteProduct,
    updateProduct,
    GetProductById
};

