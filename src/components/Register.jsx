import React from 'react'

export default function Register() {
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="far fa-edit user-icon" />
        <h4 className="login">Register</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin">
          <input className="form-control" placeholder="Enter your Name" type="text" name="name" />
          <input className="form-control my-2 " placeholder="Enter your email" type="email" name="email" />
          <input className="form-control  " placeholder="Enter your Password" type="password" name="password" />
          <input className="form-control  my-2" placeholder="Password Confirmation" type="password" name="PasswordConfirmation" />
          <button className="btn btn-default-outline my-4 w-100 rounded">Register</button>
          <a className="btn btn-default-outline" href="login.html">Login</a>
        </form>
      </div>
    </div>
  )
}
