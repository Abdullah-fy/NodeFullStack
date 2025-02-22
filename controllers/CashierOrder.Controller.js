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

//4-get cashier
static async getCashier(req,res){
    try {
        const{CashierId}=req.params;
        const cashier=await OrderService.findCashier(CashierId);
        if(!cashier)
        {
            return res.status(404).json({message:"No Cashier found"});
        }
        return res.status(200).json(cashier);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//5-get inventry
static async getInventory(req,res){
    try {
        const{branchId}=req.params;
        const inventory=await OrderService.findInventory(branchId);
        if(!inventory)
        {
            return res.status(404).json({message:"No Invcentory found"});
        }
        return res.status(200).json(inventory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

static async addToCart(req,res){
    try {
        const { CasherId, productId, quantity } = req.body;

        //Validate body
        if (!CasherId || !productId || !quantity) {
            return res.status(400).json({ message: 'Missing required ' })
        };

        const cart = await OrderService.addToCart(CasherId, productId, quantity);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
}

module.exports=cashierOrderController;