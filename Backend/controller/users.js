const userModel= require("../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
SECRET_KEY ="TechnoElevate"


const register=async(req, res, next) => {
   let {uname,uemail,upass,role}=req.body
   try {
    const uemailExists=await userModel.findOne({uemail: uemail})
    if(uemailExists) {
        res.status(400).json({
            error:true,
            message:"email already exists",
            data:null
        })
    }else {
       const saltrounds=10
       //salt of the password,we are encrypting the password using saltround
       const salt= await bcrypt.genSalt(saltrounds)

       //hash password,it makes the password encrypted
       const hashpassword=await bcrypt.hash(upass,salt)

       await userModel.insertMany([
            {uname,uemail,role,upass:hashpassword}
       ])
       res.status(200).json({
        error:false,
        message:"registration successful",
        data: null
    })
}
   }
    catch(err) {
        next(err)
        }
    }
        // login Logic
        const login=async(req, res, next) => {
            let{uemail,upass}=req.body
            try{
                const userData= await userModel.findOne({uemail}).lean()
                if(userData){
                    let{uname,role}=userData
                    const isPasswordMatch=await bcrypt.compare(upass, userData.upass)

                    if(isPasswordMatch){
                        const payload={uname,role}
                        const token=await jwt.sign(payload,SECRET_KEY,{
                            expiresIn:"5h"
                        })
                        res.status(200).json({
                            error:false,
                            message:"login successful",
                            data: {
                                uname,role,token
                            }
                        })
                    }else{
                        res.json({
                            error:true,
                            message:"Invalid password",
                            data: null
                        })
                    }
                }
                else{
                    res.status(401).json({
                        error:true,
                        message:"User not registered",
                        data: null
                })
        }
    }catch(err) {
            next(err)
        }
    }

    let usersData=async (req,res,next)=>{
        try{
            let userData=await userModel.find().lean()
            res.json({
                error:false,
                message:"Success",
                data:{userData}
            })
        }
        catch(err){
            next(err)
        }
    }
    // edit

    const getUser=async(req,res)=>{
        console.log(req.params._id);
        _id=parseInt(req.params._id)
        try{
    
             const val=await userModel.findOne({_id:req.params._id}).lean()
            // res.render("./editproduct.handlebars",{selectedProduct:productToEdit})
            res.json({
                error:false,
                message:"get edit",
                data:{
                    val
                }
            })
        }
        catch(err){
           next(err)    
       }
     }
    
    const getUsers=async(req,res)=>{
        console.log(req.body)
        let {_id,uname,uemail}=req.body;
        try{
            const val1=await userModel.updateOne({_id},{$set:{uname,uemail}})
            res.json({
                error:false,
                message:"edit successful",
                data:{ val1 }
            })
        }
        catch(err){
            next(err)
        } 
    }

    module.exports ={
        login,register,usersData,getUser,getUsers
    }