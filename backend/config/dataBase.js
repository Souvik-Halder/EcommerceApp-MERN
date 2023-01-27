const mongoose=require('mongoose');


const connectDataBase=()=>{
    mongoose.set('strictQuery',true)
    mongoose.connect(process.env.DB_URI)
    
    .then((data)=>{
        console.log(`MongoDB is Connected ${data.connection.host}`)
    })
   

}

module.exports=connectDataBase