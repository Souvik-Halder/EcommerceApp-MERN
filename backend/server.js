const app=require('./app');
const dotenv=require('dotenv');
const cloudinary=require('cloudinary')

//Config 
dotenv.config({path:"backend/config/config.env"});

//connection to the database
const connectDataBase=require('./config/dataBase')
connectDataBase()

//cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})


//Handling Uncaught Exception
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server");
  process.exit(1)
})


app.listen(4000,(err)=>{
  
   console.log(`Server is running at the port ${process.env.PORT}`)
})

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to Unhandled Promise Rejection`);
 
   process.exit(1)
 });