import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({setUserData}) {
  let navigate =useNavigate();
  function goToUser(){
    let path='/user';
    navigate(path);
  }
  let navigate2 =useNavigate();
  function goToRegister(){
    let path='/register';
    navigate2(path);
  }
  let [loading,setLoading]=useState(false);
  let [user,setUser]=useState({
    email: '',
    password: '',
  });

 let [errorMsg,setErrorMsg]=useState();

  let submitForm=async(e)=>{
    e.preventDefault();
    let {data}=await axios.post('http://localhost:3000/api/v1/auth/signin',user);
    // console.log(data);
    // let validateResult =formValedate();
    // if ( ()=> validateResult===true){
    //   setValedateError(validateResult.error.details);
    // }
    setLoading(true);
    
    if(data.message=="login"){
     localStorage.setItem('token',data.loginToken);
     console.log(data.loginToken);
      setUserData();
      goToUser();
      
    }else{
     setErrorMsg(data.message);
    }
    
    
   
    
 }
 let formData=(e)=>{
  let myUser={...user};
  myUser[e.target.name]=e.target.value;
  setUser(myUser);
//  console.log(myUser);
 }
 function formValedate(){
  const schema = Joi.object({
    email:Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string().required(), 
  });
  return schema.validate(user,{abortEarly:false});
 }
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
       {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>: ' '}
        <form onSubmit={submitForm}>
          <input onChange={formData} className="form-control" placeholder="Enter your email" type="text" name="email" />
          <input onChange={formData} className="form-control my-4 " placeholder="Enter your Password" type="text" name="password" />
          <button type='submit' className="btn btn-default-outline my-4 w-100 rounded">
          {loading?<i className="fas fa-spinner fa-spin"></i>:'Login'}
          </button>
          <p><a className="text-muted forgot btn" href="#">I Forgot My Password</a></p>
          <button onClick={goToRegister} className="btn btn-default-outline" >Register</button>
        </form>
      </div>
    </div>


  )
}
