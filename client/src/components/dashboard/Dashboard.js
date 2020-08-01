import React, { useState } from "react";
import { Layout, Menu } from "antd";
import MandalTab from "./MandalTab.js";
import AdminTab from "./AdminTab.js";
const { Header, Footer, Sider, Content } = Layout;

function Dashboard() {
  const [dashBoard, setdashBoard] = useState({
    tab: "Mandals",
  });
  const { tab } = dashBoard;
  const onChange = (e) => {
    setdashBoard({ ...dashBoard, tab: e.key });
  };
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Logout</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider>
          <Menu defaultSelectedKeys={[tab]} mode="inline" onClick={onChange}>
            <Menu.Item key="Mandals">Mandals</Menu.Item>
            <Menu.Item key="Admins">Admins</Menu.Item>
            <Menu.Item key="Settings">Settings</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content>
            {tab === "Mandals" && <MandalTab></MandalTab>}
            {tab === "Admins" && <AdminTab></AdminTab>}
            {tab === "Settings" && <div>Settings</div>}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
