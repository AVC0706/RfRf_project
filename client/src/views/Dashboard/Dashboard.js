import React, { useContext } from "react";
import classes from "./Dashboard.module.css";
import UserContext from "../../context/user/userContext";
import DashboardView from "../../components/dashboard/Dashboard";
import { Col, Row } from "antd";
import Navbar from "../../components/navbars/header/header";

const Dashboard = (props) => {
  const userContext = useContext(UserContext);
  return (
    <><Navbar></Navbar><Row>
      <Col span={2} />
      <Col span={20}>{userContext.user && userContext.user.admin.toLowerCase() !== "null" ? (
        <DashboardView />
      ) : (
          <p>You are not a admin.</p>
        )}</Col>
      <Col span={2} />
    </Row></>

  );
};

export default Dashboard;
