import React from 'react';
import { proxy,useSnapshot } from 'valtio';

function getAuthUser(){
  const jwt=window.localStorage.getItem('jwt');
  
  if(!jwt){
    return {};
  }
  const decodedJwt=atob(jwt);
  return JSON.parse(decodedJwt);
  
}
function getisAuth(){
  const isAuth=window.localStorage.getItem('isAuth');
  if(!isAuth){
    return false;
  }
  return true;
}

const actions={
    login:({user})=>{
        state.authUser=user;
        state.isAuth=true;
        window.localStorage.setItem('jwt',btoa(JSON.stringify(user)));
        // window.localStorage.setItem('name',btoa(user.name));
        // window.localStorage.setItem('email',btoa(user.email));
        window.localStorage.setItem('isAuth',true);
    },
    logout:()=>{
      state.authUser="";
      window.localStorage.removeItem('jwt');
      window.localStorage.removeItem('isAuth');
      state.isAuth=false;
      console.log("Logout");
    }
}
const state=proxy({
  authUser:getAuthUser(),
  isAuth:getisAuth(),
})

const useAuth = () => {
  const snap=useSnapshot(state);
  console.log(snap);
  return {
    ...actions,
    ...state
  };
}

export default useAuth