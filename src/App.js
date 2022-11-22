import './App.css';
import Navbar from './components/Navbar';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Messages from './components/Messages';

function App() {
  return (
    <>
      <Navbar/>
      <hr />
      <User/>
      <hr />
      <Login/>
      <hr />
      <Register/>
      <hr />
      <Messages/>
      <hr />
      <Home/>
    </>
  );
}

export default App;
