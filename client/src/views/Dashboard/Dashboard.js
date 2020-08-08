import React, { useContext } from "react";
import classes from "./Dashboard.module.css";
import UserContext from "../../context/user/userContext";
import DashboardView from "../../components/dashboard/Dashboard";

const Dashboard = (props) => {
  const userContext = useContext(UserContext);
  return (
    <div>
      {userContext.user && userContext.user.admin.toLowerCase() !== "null" ? (
        <DashboardView />
      ) : <p>You are not a admin.</p>}
    </div>
  );
};

export default Dashboard;
