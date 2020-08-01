import React, { useContext } from "react";
import classes from "./StateAdmin.module.css";
import UserContext from "../../context/user/userContext";
import Dashboard from "../../components/dashboard/Dashboard";

const StateAdmin = (props) => {
  const userContext = useContext(UserContext);
  return (
    <div>
      {userContext.user && userContext.user.admin === "state" ? (
        <Dashboard />
      ) : null}
    </div>
  );
};

export default StateAdmin;
