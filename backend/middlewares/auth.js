const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
   if(!token){
    return next(new Errorhandler("Please Login to access this resource",401))
   }
   const decodedData=jwt.verify(token,process.env.JWT_SECRET)
   req.user= await User.findById(decodedData.id)//when we signed the token you can see we use id to sign the data so here we got the id from decoded data
   next();
})

exports.authorizeRoles=(...roles)=>{
   return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
       next( new Errorhandler(`Role ${req.user.role} is not allowed to access the resource`,403))
    }
    next();
}

}