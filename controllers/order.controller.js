const orderService = require('../services/order.service');


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
}

module.exports = orderController;