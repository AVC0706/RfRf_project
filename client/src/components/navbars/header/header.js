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
        <div className="logo">
          <img
            src="assets\images\rfr-logo-e1507472294835.png"
            width="15%"
            style={{ position: "fixed" }}
          />
        </div>
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
