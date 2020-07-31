import React from "react";
import logo from "./logo.svg";
import "./App.css";
//import UserState from './context/user/UserState';
import Login from "./views/Auth/Login/Login";
import Register from "./views/Auth/Register/Register";
import Navbar from "./views/Auth/Navbar";
import MandalRegister from "./views/Auth/Register/MandalRegister";

function App() {
  return (
    // <UserState>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    // </UserState>
    <>
      <Navbar />
      <Login />
      <Register/>
      <br></br>
      <MandalRegister />
    </>
  );
}

export default App;
