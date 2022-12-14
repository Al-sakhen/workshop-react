/* eslint-disable no-lone-blocks */
import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';


export default function Login({setUserData}) {
    let navigate = useNavigate();
    function goToUser(){
        let path='/messages';
        navigate(path);
    }
    let navigate2 = useNavigate();
    function goToRegister(){
        let path='/register';
        navigate2(path);
    }
    let navigate3 = useNavigate();
    function goToForget(){
        let path='/forgotPassword';
        navigate3(path);
    }
    let [loading,setLoading] = useState(false);
    let [user,setUser]=useState({
        email: '',
        password: '',
    });
    let [valedatError,setValedateError]=useState([]);
    // let [errorMsg,setErrorMsg]=useState();

    let submitForm=async(e)=>{
        e.preventDefault();
        let {data} = await axios.post('http://localhost:3000/api/v1/auth/signin',user);
        let validateResult = formValedate();
        if ( ()=> validateResult === true){
            setValedateError(validateResult?.error?.details);
        }
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, "2000")
        
        if(data.message === "login"){
            localStorage.setItem('token',data.loginToken);
            setUserData();
            goToUser();
            toastr.success('Welcome again to saraha !');
        }else{
            if(data.message === "email not exist"){
                toastr.error(`email not exist`);
            }else if(data.message === "password incorrect"){
                toastr.error(`password incorrect`);
            }else if(data.messge === "plz confirm your email"){
                toastr.error(`Please check your email to activate the account!`);
            }else{
                data.validationArr.forEach(error => {
                    toastr.error(`${error[0].message}`);
                });
            }
        }
    }
    let formData=(e)=>{
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
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
            <form onSubmit={submitForm}>
                <input onChange={formData} className="form-control" placeholder="Enter your email" type="email" name="email" />
                <input onChange={formData} className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" />
                <button type='submit' className="btn btn-default-outline my-4 w-100 rounded" disabled={loading}>
                    {loading?<i className="fas fa-spinner fa-spin"></i>:'Login'}
                </button>
                <button onClick={goToForget} className="text-muted forgot btn d-block m-auto" >
                    I Forgot My Password
                </button>
                <button onClick={goToRegister} className="btn btn-default-outline mt-3" >
                    Register
                </button>
            </form>      
        </div>
    </div>
)
}
