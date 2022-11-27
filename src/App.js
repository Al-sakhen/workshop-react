import './App.css';
import Navbar from './components/Navbar';
import SendMessages from './components/SendMessages';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Messages from './components/Messages';
import { Navigate, Route,Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Alluser from './components/Alluser';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  let [loginData,setLoginData]=useState(null);

  function setUserData(){
    let token =localStorage.getItem('token');
    let decoded =jwtDecode(token);
    
    setLoginData(decoded); 
    // console.log(loginData);
  }

  function logout(){
    localStorage.removeItem('token');
    setLoginData(null);
    Navigate('/login');

  }

   useEffect( ()=>{
    if(localStorage.getItem('token')){
      setUserData();
    }
  },[])
  return (
    <>
      <Navbar  loginData={loginData} logout={logout}/>
      <Routes>
          <Route element={<ProtectedRoute loginData={loginData} />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          
          <Route path='messages' element={<Messages />}></Route>
          {/* <Route path='alluser' element={<Alluser />}></Route> */}
          </Route>
          <Route path='sendmessage' element={ <SendMessages />}></Route>
          <Route path='alluser' element={<Alluser />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login  setUserData={setUserData} />}></Route>
      </Routes>
      
    </>
  );
}

export default App;
