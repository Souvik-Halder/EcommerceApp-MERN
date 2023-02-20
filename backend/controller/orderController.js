const Order=require('../models/orderModels');
const Errorhandler = require('../utils/errorHandler');
const catchAsyncErrors=require('../middlewares/catchAsyncErrors');
const Product=require('../models/productModels');


//Create new Order
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const{shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;
    const order=await Order.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
        paidAt:Date.now(),
        user:req.user.id
    })
    res.status(201).json({
        success:true,
        order
    })
})

//get single order
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    //This populate function will take the user id from the order and then it will populate the name and email of the user from the User database

    if(!order){
        return next(new Errorhandler("Order not found with this id",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//Get logged in user orders
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user.id})
    //This populate function will take the user id from the order and then it will populate the name and email of the user from the User database


    res.status(200).json({
        success:true,
        orders
    })
})

//Get all orders -(admin)
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find();
    //We need to calculate the total amount so that we can easily get how much money we will get from this
    let totalAmount=0;
    orders.forEach(order=>totalAmount+=order.totalPrice);
    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})


//Update order status - (admin)
//This route is basically for update the 
exports.upadateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    
    if(!order){

        return next(new Errorhandler("Order not found with this id",404))
    }

    if(order.orderStatus==="Delivered"){
        return next(new Errorhandler('You have already delivered this order',400))
    }
   order.orderItems.forEach(async(order)=>{
   
    await updateStocks(order.product,order.quantity);
   })
   order.orderStatus=req.body.status;
   //This below if statement checks wheather the order is delivered or not if deliverd than it simply put the time as now

   if(req.body.status==="Delivered"){
    order.deliveredAt=Date.now();
   }
   await order.save({validateBeforeSave:false})
   order.deliveredAt
    res.status(200).json({
        success:true,
        
    })
})

async function updateStocks(id,quantity){
    const product=await Product.findById(id);


    product.Stock=product.Stock-quantity;

   await product.save({validateBeforeSave:false})
}


//Delete Order --(admin)
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order= await Order.findById(req.params.id);
    if(!order){
        return next(new Errorhandler("Order not found with this id",404))
    }
    await order.remove();

    res.status(200).json({
        success:true,
        message:"Order deleted Successfully"
    })
})