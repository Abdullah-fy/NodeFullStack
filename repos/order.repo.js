const Order = require('../models/order.model');

class orderRebo {
    //1-find all ==> for admin
    static async findAllOrder(){
        try {
            const orders= await Order.find();
            return orders;       
        } catch (error) {
            throw new Error('Error Acessing orders')
        }

    }
    //1-find order by customer id
    static async findOrderByCustomerId(customerId) {
        try {
            const order = await Order.findOne({ customerId });
            return order
        } catch (error) {
            throw new Error('Error finding order, Please try again later. ');
        }
    }

    //2-Create new Order
    static async createOrder(orderData) {
        try {
            const order = new Order(orderData);
            return await order.save();
        } catch (error) {
            throw new Error('Error placing order. Please try again later')
        }
    }
}
