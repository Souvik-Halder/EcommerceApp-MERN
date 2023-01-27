const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price:{
    type: String,
    required: [true, "Please Enter Product Price"],
    maxLength:[8,"Price cannot be excedd than 8 characters"]
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews:[
    {
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
      },
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});



module.exports= mongoose.model("product",productSchema)