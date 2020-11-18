import React from "react";
import {Col, Row} from "antd";


const SecondNav = () => {


    return (
        <Row>
            <Col span={2}/>
            <Col span={20}>
                <Row>
                    <img
                        src="assets\images\banner.png"
                        style={{width: '100%', height: '180px'}} alt={''}/>

                </Row>

            </Col>
            <Col span={2}/>
        </Row>
    )
};

export default SecondNav
