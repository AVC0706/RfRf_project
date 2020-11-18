import React, {useState} from "react";
import {Layout, Menu} from "antd";
import MandalTab from "./MandalTab.jsx";
import AdminTab from "./AdminTab.jsx";
import MandalAdminTab from "./MandalAdminTab.jsx";

const {Sider, Content} = Layout;

function Dashboard() {
    const [dashBoard, setdashBoard] = useState({
        tab: "Admins",
    });
    const {tab} = dashBoard;
    const onChange = (e) => {
        setdashBoard({...dashBoard, tab: e.key});
    };

    return (
        <Layout style={{minHeight: "92vh"}}>
            <Layout>
                <Sider>
                    <Menu theme='dark' defaultSelectedKeys={[tab]} mode="inline" onClick={onChange}>
                        <Menu.Item key="Admins">User Database</Menu.Item>
                        <Menu.Item key="Mandals">Mandals</Menu.Item>
                        <Menu.Item key="Mandal Admins">Mandal Admins</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: "0 24px 24px"}}>
                    <Content>
                        {tab === "Mandals" && <MandalTab></MandalTab>}
                        {tab === "Admins" && <AdminTab></AdminTab>}
                        {tab === "Mandal Admins" && <MandalAdminTab></MandalAdminTab>}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
