const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        Unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
});
schema.methods.generateAccessToken=function(){
    const accessToken=jwt.sign(
        {
            user:{
                name:this.name || "",
                email:this.email,
                password:this.password
            } 
        },
        process.env.ACCESS_TOKEN,
        {expiresIn:'1d'}
    )
    return accessToken;
}
schema.methods.toUserResponse=function(){
    return {
        user:{
            name:this.name,
            email:this.email,
            accessToken: this.generateAccessToken()
        }
    }
}
const model=mongoose.model('users',schema);

module.exports=model;