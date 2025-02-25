const express=require('express');
const analysisController = require('../controllers/analysis.controller');

const router=express.Router();

//get all analysis
router.get("/getAllAnalysis",analysisController.analysis);

module.exports=router;