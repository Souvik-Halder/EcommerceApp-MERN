const app=require('./app');
const dotenv=require('dotenv');


//Config 
dotenv.config({path:"backend/config/config.env"});

//connection to the database
const connectDataBase=require('./config/dataBase')
connectDataBase()


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