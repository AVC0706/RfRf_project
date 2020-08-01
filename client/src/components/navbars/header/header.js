import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
function Navbar() {
  const layout = {
    float: "right",
  };
  return (
    <div>
      <Header>
        <div className="logo" />
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
      </Header>
    </div>
  );
}

export default Navbar;
