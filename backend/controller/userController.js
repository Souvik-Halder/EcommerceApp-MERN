const Errorhandler = require('../utils/errorHandler');
const catchAsyncErrors=require('../middlewares/catchAsyncErrors');
const cloudinary=require('cloudinary')

const User=require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const crypto=require('crypto')
const sendEmail=require('../utils/sendEmail.js')
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      console.log(myCloud)
    const {name,email,password}=req.body;
    const user=await User.create(
       {
         name,email,password,
         avtar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
         }
    });
    sendToken(user,200,res)

})

//Login User
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    //checking if user has given the password and email both
    if(!email|| !password){
        return next(new Errorhandler('Please Enter email and password',400))
    }
    const user=await User.findOne({email}).select('+password')//This is because as we have done the select false to the password which need to be shown in that case so we need to use this
    
    if(!user){
        return next(new Errorhandler("Invalid Email or Password",401));//here 401 stands for teh status code which is unauthorized
    }
 
    const isPasswordMatched = await user.comparePassword(password);
  
    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid Email or Password",401));
    }
await  sendToken(user,200,res)
})

exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Logged Out Successfully'
    })
})

//Forgot Password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhandler("User Not Found",404))
    }
    //Get Password Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({validateBeforeSave:false})
    const resetPasswordUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    console.log(resetPasswordUrl)
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
   res.status(200).json({
    success:true,
    message:"Sent Successfully",
    resetPasswordUrl
   })
    // try {
    //     await sendEmail({
    //         email:user.email,
    //         subject:'Ecommerce password recovery',
    //         message
    //     });
        
    // } catch (error) {
    //     user.resetPasswordToken=undefined;
    //     user.resetPasswordExpire=undefined;
    //     await user.save({validateBeforeSave:false})
    //     return next( new Errorhandler(error.message,500))
    // }

})

//Reset Password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    //creating token hash
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if (!user) {
        return next(
          new Errorhandler(
            "Reset Password Token is invalid or has been expired",
            400
          )
        );
      }
    
      if (req.body.password !== req.body.confirmPassword) {
        return next(new Errorhandler("Password does not password", 400));
      }
    
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    
      await user.save();
    
      sendToken(user, 200, res);
});


//Get user details
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

//Update user Password
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid Email or Password",401));
    }
    if(req.body.newPassword!== req.body.confirmPassword){
        return next(new Errorhandler("password does not match",400));
        
    }
    user.password = req.body.newPassword;

    await user.save();
  
    sendToken(user, 200, res);
})
//Update user profile
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
 const newUserData={
    name:req.body.name,
    email:req.body.email
 }
 const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
 })
  
   res.status(200).json({
    success:true,
    message:"User updated Successfully"
   })
})
//Get all users (admin)
exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();
    const userCount=await User.countDocuments();
    res.status(200).json({
        success:true,
        users,
        userCount
    })
})

//Get single User (admin)
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler(`User does not exist with id ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    })
})

//Update user role (admin)
exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
       name:req.body.name,
       email:req.body.email,
       role:req.body.role
    }
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
       new:true,
       runValidators:true,
       useFindAndModify:false
    })
     
      res.status(200).json({
       success:true,
       message:"User updated Successfully By admin"
      })
   })
//Delete user  (admin)
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

   //we will remove from cloudnary later
     if(!user){
        return next(new Errorhandler(`User does not exist with Id : ${req.params.id}`))
     }
     await user.remove();
      res.status(200).json({
       success:true,
       message:"User delted Successfully By admin"
      })
   })