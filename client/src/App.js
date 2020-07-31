import React from "react";
import logo from "./logo.svg";
import "./App.css";
//import UserState from './context/user/UserState';

import Navbar from "./components/navbars/header/Navbar";
import Routes from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
}

export default App;
