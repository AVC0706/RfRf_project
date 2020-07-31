import React, { useContext } from "react";
import classes from "./StateAdmin.module.css";
import UserContext from "../../context/user/userContext";

const StateAdmin = (props) => {
  const userContext = useContext(UserContext);
  return <div>{userContext.user ? userContext.user.email : null}</div>;
};

export default StateAdmin;
