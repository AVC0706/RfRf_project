import React, {useContext, useEffect, useState} from "react";
import {Col, Row, Tabs} from "antd";
import Register from "../../views/Auth/Register/Register";
import UserContext from "../../context/user/userContext";

import axios from "axios";
import DataTable from "./DataTable";

const {TabPane} = Tabs;


function MandalAdminTab(props) {
    const userContext = useContext(UserContext);
    const {user} = userContext;
    const [loading, setLoading] = useState(true);
    const [mandalPanel, setmandalPanel] = useState({
        tab: "Existing",
    });
    useEffect(() => {
        getMandalAdmins();
    }, []);

    const getMandalAdmins = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/admin/getAdmins/mandal")
            .then((res) => {
                if (res.status === 200) {
                    setmandalAdmins(res.data.users);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const {tab} = mandalPanel;
    const [mandalAdmins, setmandalAdmins] = useState([]);
    return (
        <Tabs defaultActiveKey={tab}>
            <TabPane tab="Existing Admins" key="Existing"><DataTable redirect={props.redirect} users={mandalAdmins} adminType={'mandal'} /></TabPane>
            
        </Tabs>
    );
}

export default MandalAdminTab;
