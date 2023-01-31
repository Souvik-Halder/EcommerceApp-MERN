const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const cors=require('cors');
const errorMiddleware=require('./middlewares/error')
//Json setup for backend
app.use(express.json())
app.use(cookieParser())
app.use(cors())
//Route imports
const product=require('./routes/productRoute');
const user=require('./routes/userRoute')
const order=require('./routes/orderRoute')

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order)


//Middleware for error
app.use(errorMiddleware)

module.exports=app
