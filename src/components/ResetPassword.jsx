import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    let navigate=useNavigate();
    function goToLogin(){
        let path = '/login';
        navigate(path);
    }

    let [user,setUser]=useState({
        email: '',
        code:'',
        password:''
    });
    let submitForm=async(e)=>{
        e.preventDefault();
        let {data}=await axios.patch('http://localhost:3000/api/v1/auth/forgetpassword',user);

        if(data.message === 'Done'){
            toastr.success(' Password successfully changed');
            goToLogin();
        }else{
            toastr.error('In-valid account or In-valid OTP Code');
        }

    }

    let formData=(e)=>{
        let myUser={...user};
        myUser[e.target.name]=e.target.value;
        setUser(myUser);
    }
return (
    <>
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="fas fa-user-secret user-icon" />
                <h4 className="login">Reset Password</h4>
            </div>
            <div className="card p-5 w-50 m-auto">
                <form onSubmit={submitForm}>
                    <input onChange={formData} className="form-control" placeholder="Enter your email" type="text" name="email" />
                    <input onChange={formData} className="form-control my-4" placeholder="Enter your access code" type="text" name="code" />
                    <input onChange={formData} className="form-control my-4" placeholder="Enter your new password" type="password" name="password" />
                    <button type='submit' className="btn btn-default-outline my-4 w-100 rounded">
                    Reset Password
                    </button>
                </form>      
            </div>
        </div>
    </>
)
}
