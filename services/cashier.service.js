const orderRepo = require('../repos/cashierOrder.repo');
const CartRepo = require('../repos/cart.repo');
const Product = require('../models/product.model');
const CartService = require('./cart.service')
const { Error } = require('mongoose');
const Inventory =require('../models/Inventory')
const staff=require('../models/staff');

//1-place order in branch
class CashierorderService{
    //1-create order
static async createOrder(CashierId ,paymentMethod,CreditCardNumber,ExpiryMonth,ExpiryYear,CVVCode) {
    try {
        const cart = await CartRepo.findCartByCustomerId(CashierId);
        const cashier= await staff.findById(CashierId)
        if (!cashier) {
            throw new Error("this cashier not found in staff.");
        }
        const branchId=cashier.baranchId;

        const inventory = await Inventory.findById(branchId);
        if (!inventory) {
            throw new Error("Inventory not found for this branch.");
        }
        //1-check again if every product is still avaliable
        const unavailableItems = [];
        for (const item of cart.items) {
            const product =inventory.products.find(p => String(p.productId) === String(item.productId));;

            if (!product || product.stock < item.quantity) {
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
            CashierId,
            items: cart.items,
            paymentDetails: { totalAmount: cart.totalAmount, paymentMethod,CreditCardNumber,ExpiryMonth,ExpiryYear,CVVCode },
        })

        //4-update in order stock
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            product.stockQuantity -= item.quantity;
            await product.save();
        }

        //5-update in branch
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
        await CartService.clearCart(CashierId);

        //6-return the order
        return order;
    } catch (error) {
        throw new Error(`Failed to place order:${error.message}`)
    }
}
//2-get order by caher id 
static async getOrdersByCashierId(CashierId) {
    try {
        return orderRepo.findOrderByCashierId(CashierId);
    } catch (error) {
        throw new Error(`Failed to fetch Cashier orders: ${error.message}`);
    }
}
//3-find all branchs order
static async findAllorder(options) {
    try {
        return await orderRepo.findAllOrder(options);
    } catch (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`)
    }

}

}

module.exports=CashierorderService