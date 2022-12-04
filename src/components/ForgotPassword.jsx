import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';
export default function ForgotPassword() {
    let navigate =useNavigate();
    function goToReset(){
        let path='/resetPassword';
        navigate(path);
    }

    let [email,setEmail]=useState([]);
    let formData=async(e)=>{
        e.preventDefault();
        let {data}=await axios.patch('http://localhost:3000/api/v1/auth/sendCode',email);
        //  console.log(data);
         if(data.message==='Done , plz check your Email To Change Password'){
            toastr.success(' plz check your Email To Change Password');
            goToReset();
         }else{
            toastr.error('not register account');
         }
         

    }
    let formemail=(e)=>{
        let emailform={...email};
        emailform[e.target.name]=e.target.value;
        setEmail(emailform);
        // console.log(email);
    }
  return (
    <>
    <div className="container text-center my-5">
        <div className="user my-3">
            <i className="fas fa-user-secret user-icon" />
            <h4 className="login">Forgot Password</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
            <form onSubmit={formData}>
                <input onChange={formemail} className="form-control" placeholder="Enter your email" type="text" name="email" />
                <button type='submit' className="btn btn-default-outline my-4 w-100 rounded">
                Send Reset Code
                </button>
                
                
            </form>      
           

        </div>
    </div>
    </>
  )
}

