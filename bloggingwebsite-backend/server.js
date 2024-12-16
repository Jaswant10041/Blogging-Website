require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const PORT=process.env.PORT || 4000;
app.use(express.json());
const DbConnect=require('./config/dbConnect');

DbConnect();

app.use('/api',require('./routes/userRouter'));



mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log("app is listening");
    })  
})
mongoose.connection.on('error',(err)=>{
    console.log("Error while connecting to MongoDB: ",err);
});
