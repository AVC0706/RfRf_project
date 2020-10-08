import React, { useEffect, useContext } from "react";
import "./App.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import UserContext from "./context/user/userContext";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import SecondNav from "./components/navbars/header/altHeader";
import Navbar from "./components/navbars/header/header";
import 'primeicons/primeicons.css';

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
        <Navbar></Navbar>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
