import React, { useEffect, useContext } from "react";
import "./App.css";

import Navbar from "./components/navbars/header/header";

import UserContext from "./context/user/userContext";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

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
    </div>
  );
}

export default App;
