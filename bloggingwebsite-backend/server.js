require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const cors=require('cors');
const corsOptions=require('./models/corsOptions');
const PORT=process.env.PORT || 4000;
app.use(express.json());
app.use(cors(corsOptions));
const Users=require('./models/userModel');
const DbConnect=require('./config/dbConnect');

DbConnect();
app.use('/api',require('./routes/userRouter'));

mongoose.connection.once("open",async()=>{
    console.log("Connected to MongoDB");
    
    app.listen(PORT,()=>{
        console.log(`app is listening on ${PORT}`);
    })  
    // const foundData=await Users.findOne({email:'jasu@gmail.
    // console.log(foundData);
})
mongoose.connection.on('error',(err)=>{
    console.log("Error while connecting to MongoDB: ",err);
});
