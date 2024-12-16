const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');
const Users=require('../models/userModel');
const userLogin=async(req,res)=>{
    const data=req.body;
    const foundData=await Users.findOne({email:data.email});
    const flag=await bcrypt.compare(data.password,foundData.password);
    // res.status(200).json(flag);
    if(flag==false){
        res.status(201).json({msg:"Incorrect credentials"});
    }
    else{
        res.status(201).json({msg:"Login Successful"});
    }
    // console.log(flag);
    // console.log('Login successfull');
    
}
const userRegister=async(req,res)=>{
    const data=req.body;
    if(!data || !data.name || !data.email || !data.password){
        res.status(200).json({"msg":"Every field is required"});
    }
    //hashing a password
    const hashedPassword=await bcrypt.hash(data.password,10);
    // res.status(200).json({...data,password:hashedPassword});
    const temp={
        name:data.name,
        email:data.email,
        password:hashedPassword
    }
    
    const insertedData=await Users.create(temp);
    const dataWithToken=insertedData.toUserResponse();
    res.status(200).json(dataWithToken);

}   
module.exports={userLogin,userRegister};