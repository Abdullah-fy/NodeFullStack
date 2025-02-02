const orderService = require('../services/order.service');
const  authenticateToken  = require('../middlewares/authontication.middleware');

//create a new order
async function createOrderController(req, res) {
    try {
        const { customerId, items, paymentDetails } = req.body;
        const order = await orderService.createOrder(customerId, items, paymentDetails);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error in createOrderController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//get all orders
async function getAllOrdersController(req, res) {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error in getAllOrdersController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//get an order by ID
async function getOrderByIdController(req, res) {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error in getOrderByIdController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update an order
async function updateOrderController(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const order = await orderService.updateOrder(id, updateData);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error in updateOrderController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//delete an order
async function deleteOrderController(req, res) {
    try {
        const { id } = req.params;
        const order = await orderService.deleteOrder(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error in deleteOrderController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createOrderController,
    getAllOrdersController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController
};