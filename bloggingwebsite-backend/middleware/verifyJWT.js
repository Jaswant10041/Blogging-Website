const jwt=require('jsonwebtoken');
const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);
    if(!(authHeader && authHeader.startsWith('Token '))){
        return res.status(401).json({message:"Unauthorized"});
    }
    const arr=authHeader.split(' ');
    
    console.log(arr);
    const token=arr[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err,decoded)=>{
            if(err){
                console.log(err);
                return res.status(403).json({message:`${err}`});
            }
            console.log(decoded);
            req.userId=decoded.user.id;
            req.email=decoded.user.email;
            req.pass=decoded.user.password;
            next();
        }
    )
    
}
module.exports=verifyJWT;