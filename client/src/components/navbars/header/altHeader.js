import React from "react";
import {Col, Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';

const {Header} = Layout;
const {SubMenu} = Menu;

const SecondNav = () => {
    const history = useHistory();
    const logo_style = {
        position: "absolute",
    };
    const layout = {
        float: "right",
        backgroundColor: "#ffac42",
    };
    return (
        <Row>
            <Col span={2}/>
            <Col span={20}>
                <Row>
                    <img
                        src="assets\images\banner.png"
                        style={{width: '100%', height: '180px'}}></img>

                </Row>

            </Col>
            <Col span={2}/>
        </Row>
    )
};

export default SecondNav
