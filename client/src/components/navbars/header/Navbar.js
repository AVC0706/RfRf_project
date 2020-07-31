import React from "react";
import { Layout, Menu } from "antd";

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
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Register</Menu.Item>
          <Menu.Item key="3">Login</Menu.Item>
        </Menu>
      </Header>
    </div>
  );
}

export default Navbar;
