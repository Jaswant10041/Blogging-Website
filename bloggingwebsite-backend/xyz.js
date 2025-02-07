// export function fun(){
//     console.log("hello this is xyz");
// }
// // export default fun;
// b="thussu";

// export var a="jassu";
const User=require('./models/userModel');
const data={name:"jaswant",email:"jasu@gmail.com",password:"kfkf"};
const dataWithToken=data.toUserResponse();
console.log(dataWithToken);