import React, { useEffect, useContext } from "react";
import "./App.css";
//import UserState from './context/user/UserState';

import Navbar from "./components/navbars/header/header";

import UserContext from "./context/user/userContext";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import MandalProfile from "./views/Profiles/MandalProfile";

function App() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userContext.loadUser();
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar />

        <Routes />
      </Router>
      <MandalProfile></MandalProfile>
    </div>
  );
}

export default App;
