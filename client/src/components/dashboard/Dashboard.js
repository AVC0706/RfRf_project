import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import MandalTab from "./MandalTab.js";
import AdminTab from "./AdminTab.js";
import axios from "axios";
import MandalAdminTab from "./MandalAdminTab.js";
const { Sider, Content } = Layout;

function Dashboard() {
  const [dashBoard, setdashBoard] = useState({
    tab: "Admins",
  });
  const { tab } = dashBoard;
  const onChange = (e) => {
    setdashBoard({ ...dashBoard, tab: e.key });
  };

  return (
    <Layout style={{ minHeight: "92vh" }}>
      <Layout>
        <Sider>
          <Menu defaultSelectedKeys={[tab]} mode="inline" onClick={onChange}>
            <Menu.Item key="Admins">Admins</Menu.Item>
            <Menu.Item key="Mandals">Mandals</Menu.Item>
            <Menu.Item key="Mandal Admins">Mandal Admins</Menu.Item>
            <Menu.Item key="Settings">Settings</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content>
            {tab === "Mandals" && <MandalTab></MandalTab>}
            {tab === "Admins" && <AdminTab></AdminTab>}
            {tab === "Mandal Admins" && <MandalAdminTab></MandalAdminTab> }
            {tab === "Settings" && <div>Settings</div>}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
