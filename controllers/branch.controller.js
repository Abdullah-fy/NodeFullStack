const branchesService = require('../services/branch.service')



class branchesController{


    static async getAllBranches(req,res) {
        
        try{
            const branches=await  branchesService.getAllBranches();
            res.status(200).json(branches)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }

    static async addIntervalorder(req,res){
        try{
            const order=req.body;
            if (!order.To || !order.from ) {
                return res.status(400).json({ message: "All fields are required." });
              }
            const createdorder= await branchesService.AddorderToBranch(order);
            if(!createdorder){
                return res.status(400).json({message:"couldnt insert"});
            }
            return res.status(200).json({});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }

    static async getAllorders(req,res){
        try{
            console.log("hi contr");
            const {userId}=req.params;
            const orders=await branchesService.getAllorders(userId);
            res.status(200).json(orders);
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports=branchesController;