const orderRepo = require('../repos/order.repo');
const CartRepo = require('../repos/cart.repo');
const Product = require('../models/product.model');
const CartService = require('./cart.service')
const { Error } = require('mongoose');
const Order = require('../models/order.model');
const Inventory =require('../models/Inventory')

//1-place order in branch
class casherService{
static async createOrder(CashierId, PhoneNumber, paymentMethod, shippingAddress,CreditCardNumber,ExpiryMonth,ExpiryYear,CVVCode) {
    try {
        const cart = await CartRepo.findCartByCustomerId(CashierId);
        //1-check again if every nproduct is still avaliable
        const unavailableItems = [];
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);

            if (!product || !product.isActive || product.stockQuantity < item.quantity) {
                item.isAvailable = false;
                unavailableItems.push(item);
            } else {
                item.isAvailable = true;
            }
        }
        // 1.2 Check if there are any unavailable items
        if (unavailableItems.length > 0) {
            throw new Error('Some products are not available, sorry, order cannot be placed');
        }

        //3-create the order
        let order = await orderRepo.createOrder({
            customerId,
            PhoneNumber,
            items: cart.items,
            paymentDetails: { totalAmount: cart.totalAmount, paymentMethod, shippingAddress,CreditCardNumber,ExpiryMonth,ExpiryYear,CVVCode },
        })

        //4-update in order stock
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            product.stockQuantity -= item.quantity;
            await product.save();
        }

        //5-update in online branch
        const inventory=await Inventory.findOne({branchLocation:"online"}); 
        if(!inventory)
        {
            throw new Error("Inventory not found for this branch.");
        }

        for(const item of order.items)
        {
            const product =inventory.products.find(p => String(p.productId) === String(item.productId));

            if(product){
                if(product.stock >= item.quantity)
                {
                    product.stock -= item.quantity;
                }else{
                    throw new Error(`Not enough stock for product ${item.productId}`);
                }
            }else{
                throw new Error(`Product ${item.productId} not found in inventory`);
            }
        }
        await inventory.save();

        //5-clear cart
        await CartService.clearCart(customerId);

        //6-return the order
        return order;
    } catch (error) {
        throw new Error(`Failed to place order:${error.message}`)
    }
}
}