/* eslint-disable no-lone-blocks */
import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';

export default function Register() {
    let navigate =useNavigate();
    function goToLogin(){
        let path='/Login';
        navigate(path);
    }
    let [loading,setLoading] = useState(false);
    let [user,setUser] = useState({
        userName: '',
        email: '',
        password: '',
        cpassword: ''
    });

    let [valedatError,setValedateError]=useState([]);
    let submitForm =async(e)=>{
        e.preventDefault();
        let {data}=await axios.post('http://localhost:3000/api/v1/auth/signup',user);
        let valedatResult =formValedate();
        if ( (  )=>valedatResult===true) {
            setValedateError(valedatResult?.error?.details);  
        }
        {valedatResult?setLoading(false):setLoading(true)}
        
        if(data.message === "done"){
            toastr.success('Registered successfully');
            goToLogin();
        }  
    }
    let formData=(e)=>{
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }
    function formValedate(){
        const schema = Joi.object({
            userName:Joi.string().alphanum().min(3).max(20).required(),
            email:Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:Joi.string().required(),
            cpassword:Joi.string().required(),
        });
        return schema.validate(user,{abortEarly:false});
    }
    return (
        <>
            <div className="container text-center my-5">
                <div className="user my-3">
                    <i className="far fa-edit user-icon" />
                    <h4 className="login">Register</h4>
                </div>
                <div className="card p-5 w-50 m-auto">
                    {valedatError.map( (error,index)=> 
                        <div className='btn btn-danger mb-3' key={index}>{error.message}</div>
                    )}
                    <form onSubmit={submitForm}>
                        <input onChange={formData} className="form-control" placeholder="Enter your Name" type="text" name="userName" />
                        <input onChange={formData} className="form-control my-2" placeholder="Enter your email" type="email" name="email" />
                        <input onChange={formData} className="form-control" placeholder="Enter your Password" type="password" name="password" />
                        <input onChange={formData} className="form-control my-2" placeholder="Password Confirmation" type="password" name="cpassword" />
                        <button type='submit' className="btn btn-default-outline my-4 w-100 rounded">
                            {loading?<i className="fas fa-spinner fa-spin"></i>:'Register'}
                        </button>
                        
                        <button type='button' className="btn btn-default-outline" onClick={goToLogin}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}
