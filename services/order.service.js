    const Order = require('../models/order.model');

    // Create a new order
    async function createOrder(customerId, items, paymentDetails) {
        try {
            const newOrder = new Order({
                customerId,
                items,
                paymentDetails
            });
            const savedOrder = await newOrder.save();
            console.log('Order created:', savedOrder);
            return savedOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    // Get all orders
    async function getAllOrders() {
        try {
            const orders = await Order.find().populate('customerId').populate('items.productId').populate('items.sellerId');
            console.log('Orders found:', orders);
            return orders;
        } catch (error) {
            console.error('Error finding orders:', error);
            throw error;
        }
    }

    // Get an order by ID
    async function getOrderById(id) {
        try {
            const order = await Order.findById(id).populate('customerId').populate('items.productId').populate('items.sellerId');
            if (!order) {
                console.log('Order not found');
                return null;
            }
            console.log('Order found:', order);
            return order;
        } catch (error) {
            console.error('Error finding order:', error);
            throw error;
        }
    }

    // Update order information
    async function updateOrder(id, updateData) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true }).populate('customerId').populate('items.productId').populate('items.sellerId');
            if (!updatedOrder) {
                console.log('Order not found');
                return null;
            }
            console.log('Order updated:', updatedOrder);
            return updatedOrder;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }

    // Delete an order by ID
    async function deleteOrder(id) {
        try {
            const deletedOrder = await Order.findByIdAndDelete(id);
            if (!deletedOrder) {
                console.log('Order not found');
                return null;
            }
            console.log('Order deleted:', deletedOrder);
            return deletedOrder;
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }

    module.exports = {
        createOrder,
        getAllOrders,
        getOrderById,
        updateOrder,
        deleteOrder
    };