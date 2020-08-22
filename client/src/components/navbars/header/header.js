import React, { useContext} from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import UserContext from "../../../context/user/userContext";

const { Header } = Layout;

function Navbar() {
  const userContext = useContext(UserContext);



  const layout = {
    float: "right", 
  };
  return (
    <div>
      <Header>
        <div className="logo" />

        {userContext.isAuth === true ? (
          <Menu
            style={layout}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/userProfile/${userContext.user.id}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/" onClick={userContext.logout}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu
            style={layout}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/login">Login</Link>
            </Menu.Item>
          </Menu>
        )}
      </Header>
    </div>
  );
}

export default Navbar;
