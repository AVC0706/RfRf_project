import React, { useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
//import UserState from './context/user/UserState';
import Login from "./views/Auth/Login/Login";
import Register from "./views/Auth/Register/Register";
import Navbar from "./components/navbars/header/header";
import MandalRegister from "./views/Auth/Register/MandalRegister";
import StateAdmin from "./views/StateAdmin/StateAdmin";
import UserState from "./context/user/UserState";
import UserContext from "./context/user/userContext";
import Routes from "./routes";

function App() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userContext.loadUser();
    }
  },[]);

  return (
    <div>
      <Navbar />

      <Routes />
    </div>
  );
}

export default App;
