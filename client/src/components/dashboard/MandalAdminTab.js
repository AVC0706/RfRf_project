import React, { useState } from "react";
import { Tabs, Divider, Row, Col } from "antd";
import MandalTable from "./MandalTable";
import Register from "../../views/Auth/Register/Register";
import MandalAdminsTable from "./MandalAdminsTable";
const { TabPane } = Tabs;

function MandalAdminTab() {
    const [mandalPanel, setmandalPanel] = useState({
        tab: "Existing",
    });
    const { tab } = mandalPanel;
    return (
        <Tabs defaultActiveKey={tab}>
            <TabPane tab="Existing Admins" key="Existing"><MandalTable></MandalTable></TabPane>
            <TabPane tab="Add New Mandal Admin" key="New">
            <Register></Register>
            <center><Divider plain>MAKE A USER AN ADMIN</Divider><MandalAdminsTable></MandalAdminsTable></center>
            </TabPane>
        </Tabs>
    );
}

export default MandalAdminTab;
