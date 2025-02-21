const OrderService = require('../services/cashier.service');

class cashierOrderController{
    //1-create order
static async createOrder(req, res) {
    try {
        const { CasherId, paymentMethod ,CreditCardNumber,ExpiryMonth,ExpiryYear,CVVCode} = req.body;

        //Validate body
        if (!CasherId || !paymentMethod || !CreditCardNumber|| !ExpiryMonth  || !ExpiryYear || !CVVCode) {
            return res.status(400).json({ message: `Missing required fieldsssss`})
        };

        //call service
        const order = await OrderService.createOrder(CasherId, paymentMethod,CreditCardNumber,ExpiryMonth,ExpiryYear,CVVCode);

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

    //3-get all orders CasherId
static async getOrdersByCashierId(req,res){
    try{
        const{CashierId}=req.params;
        const orders = await OrderService.getOrdersByCashierId(CashierId);

        if(!orders.length){
            return res.status(404).json({message:"No orders found"});
        }

        return res.status(200).json(orders);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}
}

module.exports=cashierOrderController;