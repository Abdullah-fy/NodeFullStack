const AnalysisService = require("../services/analysis.service");

class analysisController{


    static async analysis(req,res) {
        
        try{
            const ordersanalysis=await AnalysisService.getallordersinmonths();
            const UseraAnalysis=await AnalysisService.UseraAnalysis();
            const ordersallmonths=ordersanalysis[0];
            const numberoforders = ordersanalysis[1];
            const AllAnalysis={
                "ordersanalysis":ordersanalysis,  
                "UseraAnalysis":UseraAnalysis
            }
            res.status(200).json(AllAnalysis);

        }catch(error){
            res.status(500).json({message:error.message})
        
        }

    }
        
    




}

module.exports=analysisController;




