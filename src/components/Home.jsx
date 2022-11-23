import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate =useNavigate();
  function goToRegister(){
    let path='/register';
    navigate(path);
  }
  let navigate2 =useNavigate();
  function goToLogin(){
    let path='/login';
    navigate2(path);
  }
  return (
    <div className="container text-center my-5">
      <h4>Sarahah allows you to receive constructive feedback from your friends and co-workers</h4>
      <div className="buttons d-flex justify-content-center align-items-center  flex-column">
          <button onClick={goToLogin} className="btn btn-default-outline my-4"><i className="fas fa-user"></i> Login</button>
          <button onClick={goToRegister} className="btn btn-default-outline"><i className="far fa-edit"></i> Register</button>
      </div>
  </div>
  )
}
