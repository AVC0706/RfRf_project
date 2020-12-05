import React, {useContext} from "react";
import UserContext from "../../context/user/userContext";
import DashboardView from "../../components/dashboard/Dashboard";
import {Col, Row} from "antd";

const Dashboard = (props) => {
    const userContext = useContext(UserContext);
    const redirectUser = (id) => {
        props.history.push(`/userProfile/${id}`);
    }
    const redirectMandal = (id) => {
        props.history.push(`/mandalProfile/${id}`);
    }
    return (
        <><Row>
            <Col span={2}/>
            <Col span={20}>{userContext.user && userContext.user.admin.toLowerCase() !== "null" ? (
                <DashboardView redirectUser={redirectUser} redirectMandal={redirectMandal}/>
            ) : (
                <p>You are not a admin.</p>
            )}</Col>
            <Col span={2}/>
        </Row></>

    );
};

export default Dashboard;
