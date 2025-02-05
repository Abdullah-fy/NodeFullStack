const orderRepo = require('../repos/order.repo');
const CartRepo = require('../repos/cart.repo');
const Product = require('../models/product.model');
const CartService=require('./cart.service')
const { Error } = require('mongoose');
const Order = require('../models/order.model');

class OrderService{
    //1-create order
    static async createOrder(customerId,PhoneNumber,paymentMethod,shippingAddress)
    {
        try {
            const cart =await CartRepo.findCartByCustomerId(customerId);
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
                items:cart.items,
                paymentDetails:{totalAmount:cart.totalAmount,paymentMethod,shippingAddress},
            })

            //4-update stock
            for(const item of order.items)
            {
                const product = await Product.findById(item.productId);
                product.stockQuantity -= item.quantity;
                await product.save();
            }

            //5-clear cart
           await CartService.clearCart(customerId);

           //6-return the order
           return order;
        } catch (error) {
            throw new Error (`Failed to place order:${error.message}`)
        }
    }

    //2-Get all order (admin)
     static async findAllorder(options){
        try{
        return await orderRepo.findAllOrder(options);
        }catch(error)
        {
            throw new Error(`Failed to fetch orders: ${error.message}`)
        }

     }

    //3-get all customer order =>(customer order history)
    static async getOrdersByCustomerId(customerId){
        try{
            return await orderRepo.findOrderByCustomerId(customerId)
        }catch(error){
            throw new Error(`Failed to fetch customer orders: ${error.message}`);
        }
    }

    //4-get orders by sellerid ==> for seller
    static async getOrdersbySellerId(sellerId){
        try{
            const orders=await orderRepo.findOrderBySellerId(sellerId);

            //return only item that belong to that seller
            const filtereOrders= orders.map(order => {
                const sellerItems = order.items.filter(item => item.sellerId === sellerId);
                return { ...order.toObject(), items: sellerItems };
            })
            return filtereOrders;
        }
        catch(error){
            throw new Error(`Failed to fetch customer orders: ${error.message}`)
        }
    }


    //4-update order 
    //5-change order item status

}
   
module.exports=OrderService;
