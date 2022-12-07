import React from 'react'
import { Link } from 'react-router-dom';
export default function Navbar({loginData,logout}) {
    return (
        <nav className="navbar navbar-expand-lg bg-custom navbar-dark">
            <div className="container">
                <Link className="navbar-brand" ><img src="img/logo300.png" width={54} alt='' /> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    Menu <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                    !loginData?
                    <>
                        <ul className="navbar-nav ml-auto ">
                            <li className="nav-item">
                                <Link className="nav-link" to="alluser">All User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">Login</Link>
                            </li>
                            <li className="nav-item d-none">
                                <Link className="nav-link" to="sendmessage">Send Message</Link>
                            </li>
                        </ul>
                    </>
                    :
                    <>
                        <ul className="navbar-nav ml-auto ">
                            <li className="nav-item">
                                <Link className="nav-link" to="alluser">All User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="messages">Messages</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login" onClick={logout}>Logout</Link>
                            </li>
                        </ul>
                    </>
                    }
                </div>
            </div>
        </nav>
    )
}
