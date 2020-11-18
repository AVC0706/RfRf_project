import React, {useContext, useEffect, useState} from "react";
import {Col, Row, Tabs} from "antd";
import MandalTable from "./MandalTable";
import Register from "../../views/Auth/Register/Register";
import UserContext from "../../context/user/userContext";

import axios from "axios";

const {TabPane} = Tabs;


function MandalAdminTab() {
    const userContext = useContext(UserContext);
    const {user} = userContext;
    const [loading, setLoading] = useState(true);
    const [mandalPanel, setmandalPanel] = useState({
        tab: "Existing",
    });
    useEffect(() => {
        getNormalUsers();
    }, []);
    const getNormalUsers = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/admin/getAdmins/null")
            .then((res) => {
                if (res.status === 200) {
                    setNormalUsers(res.data.users);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const {tab} = mandalPanel;
    const [normalUsers, setNormalUsers] = useState([]);
    return (
        <Tabs defaultActiveKey={tab}>
            <TabPane tab="Existing Admins" key="Existing"><MandalTable></MandalTable></TabPane>
            <TabPane tab="Add New Mandal Admin" key="New">
                <Row>
                    <Col/>
                    <Col>
                        <Register></Register>
                    </Col>
                    <Col/>
                </Row>
            </TabPane>
        </Tabs>
    );
}

export default MandalAdminTab;
