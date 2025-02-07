const OrderService = require('../services/order.service');

class orderController {
    //1-create order
    static async createOrder(req, res) {
        try {
            const { customerId, PhoneNumber, paymentMethod, shippingAddress } = req.body;

            //Validate body
            if (!customerId || !PhoneNumber || !paymentMethod || !shippingAddress) {
                return res.status(400).json({ message: 'Missing required fields' })
            };

            //call service
            const order = await orderService.createOrder(customerId, PhoneNumber, paymentMethod, shippingAddress);

            return res.status(201).json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }
 
    //2-get all order by filter
    static async getAllOrders(req,res){
        try{
            const{page,limit,sortBy,sortedOrder,...filters}=req.query;

            const orders=await OrderService.findAllorder({
                page,
                limit,
                sortBy,
                sortedOrder,
                filter:filters,
            });

            return res.status(200).json(orders);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    //3-get all orders customerId
    static async getOrdersByCustomerId(req,res){
        try{
            const{customerId}=req.params;
            const orders = await OrderService.getOrdersByCustomerId(customerId);

            if(!orders.length){
                return res.status(404).json({message:"No orders found"});
            }

            return res.status(200).json(orders);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    //4-get all orders by sellerId
    static async getOrdersBySellerId(req,res){
        try{
            const{sellerId}=req.params;
            const orders=await orderService.getOrdersbySellerId(sellerId);

            if(!orders.length){
                return res.status(404).json({message:"No orders found"});
            }
            return res.status(200).json(orders);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }
}



module.exports = orderController;