import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark ">
            <div className="container">
            <a className="navbar-brand" href="index.html"><img src="img/logo300.png" width={54} alt='' /> </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                Menu <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto d-none">
                <li className="nav-item">
                    <a className="nav-link" href="register.html">Register</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="login.html">Login</a>
                </li>
                </ul>
                <ul className="navbar-nav ml-auto ">
                <li className="nav-item">
                    <a className="nav-link" href="messages.html">Messages</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href>Settings</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">Logout</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    )
}