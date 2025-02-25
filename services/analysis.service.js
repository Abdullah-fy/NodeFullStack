const Product = require('../models/product.model');
const Order = require('../models/order.model');
const User =require('../models/user.model');
const { analysis } = require('../controllers/analysis.controller');


class AnalysisService {

    static async  getallordersinmonths(params) {
        //try get number of oredrs and create array contain number of orders in every month  
        try{
            const orders=await Order.find({},{"paymentDetails.totalAmount":1 ,Orderstatus:1, updatedAt:1});
            
            const ordersnumber=orders.length;
           
            let ordersallmonths = new Array(12).fill(0); 
            let salesallmonths = new Array(12).fill(0); 
            
            let ordersStatus = new Array(3).fill(0)


            let month;
            console.log(ordersnumber);
            orders.forEach((order)=> {
                month=order.updatedAt.getMonth()+1;
                salesallmonths[month-1]+=order.paymentDetails.totalAmount;
                ordersallmonths[month-1]++;
                console.log(order.Orderstatus);
                switch (order.Orderstatus){
                    case "pending":
                        console.log("pending")
                        ordersStatus[0]++;
                        break;
                    case "shipped":
                        ordersStatus[1]++;
                        break;
                    case "canceled":
                        ordersStatus[2]++;
                        break;
                   
                }

              });
            console.log(ordersStatus);
            const totalSales = salesallmonths.reduce((sum, value) => sum + value, 0);
             const  allAnalysis={
                "ordersallmonths":ordersallmonths,
                "ordersnumber":ordersnumber,
                "salesallmonths":salesallmonths,
                "totalSales":totalSales,
                "ordersStatus":ordersStatus,
                "pendingorders":ordersStatus[0],
                "shippedorders":ordersStatus[1],
                "canceled":ordersStatus[2]
              }
            
            return allAnalysis;
        }catch(error){
            throw new Error(error);
        }

       
    }

    static async UseraAnalysis(params){
        try{
            const Users=await User.find({role:'customer'},{createdAt:1});
            console.log(Users);
            const customerCount=Users.length;
            let customersAllMonths=new Array(12).fill(0);
            Users.forEach(customer=>{
                if(customer.createdAt.getMonth()){
                customersAllMonths[customer.createdAt.getMonth()]++;
                }

            })
            const allUsersAnalysis={
                "customersAllMonths":customersAllMonths,
                "customerCount":customerCount
            }
            return allUsersAnalysis;
        }catch{
            console.log("error from useranalysisservice");
            throw new error("couldnt connect to db")
        }
    }







}

module.exports=AnalysisService;