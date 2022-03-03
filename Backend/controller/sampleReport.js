const samples=require('../models/sampleReport');
 
const addSample=async(req,res,next)=>{
    try{
        let{date,uname,email,sampleId,haemotology,thyroid,glucometry}=req.body
        await samples.insertMany([{
            date,
            uname,
            email,
            sampleId,
           haemotology,
            thyroid,
            glucometry

        }])
        res.json({
            error:false,
            message:"samplereport as been added successfully",
            data:null
        })
    }catch(err){
        next(err)
    }
}

//getting sample details
const getAllsamples=async(req,res,next)=>{
    try{
        const sampledata=await samples.find().lean();
        res.json({
            error:false,
            message:"",
            data:sampledata
        })
    }catch(err){
            next(err)
        }
}
module.exports={
    addSample,
    getAllsamples
}