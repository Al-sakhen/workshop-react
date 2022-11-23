import './App.css';
import Navbar from './components/Navbar';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Messages from './components/Messages';
import { Route,Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {
  let [loginData,setLoginData]=useState(null);

  function setUserData(){
    let token =localStorage.getItem('token');
    let decoded =jwtDecode(token);
    
    setLoginData(decoded); 
    // console.log(loginData);
  }

   useEffect( ()=>{
    if(localStorage.getItem('token')){
      setUserData();
    }
    
  },[])
  return (
    <>
      <Navbar  loginData={loginData} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login  setUserData={setUserData} />}></Route>
        <Route path='/user' element={ <User />}></Route>
        <Route path='/messages' element={<Messages />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      
    </>
  );
}

export default App;
