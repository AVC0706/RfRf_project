import React, {useState} from "react";
import {Layout, Menu} from "antd";
import MandalTab from "./MandalTab.js";
import AdminTab from "./AdminTab.js";
import MandalAdminTab from "./MandalAdminTab.js";

const {Sider, Content} = Layout;

function Dashboard(props) {
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
                        {tab === "Mandals" && <MandalTab redirect={props.redirectMandal}/>}
                        {tab === "Admins" && <AdminTab redirect={props.redirectUser}/>}
                        {tab === "Mandal Admins" && <MandalAdminTab redirect={props.redirectUser} />}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
