import React, {useContext, useEffect, useState} from "react";
import {Card, Col, Layout, Row, Skeleton} from "antd";

import UserContext from "../../context/user/userContext";
import axios from "axios";

const {Content} = Layout;

function MyMandal(props) {
    //start

    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.user) {
            getMandals();
        }
    }, [userContext.isAuth]);

    const [mandals, setMandals] = useState([]);

    const getMandals = () => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/user/myMandals")
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.user);
                    setMandals(res.data.user.mandals);
                    console.log(mandals);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Layout>
                        <Content>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                {userContext.user && userContext.user.admin != 'null' &&
                                <Col
                                    span={6}
                                    className="gutter-row"
                                    style={{padding: '2em'}}
                                >
                                    <center>
                                        <Card style={{width: '80%', height: 250}} hoverable={true} onClick={() => {
                                            props.history.push("/mandalRegister");
                                        }}>

                                            <center><h1><b>Add Mandal</b></h1> <img
                                                style={{width: '60%', alignItems: 'center'}} alt="example"
                                                src="assets/images/add.png"/></center>
                                        </Card>
                                    </center>

                                </Col>}

                                {mandals ? (
                                    mandals.map((mandal) => (
                                        <Col
                                            span={6}
                                            className="gutter-row"
                                            style={{padding: '2em'}}
                                        >
                                            <div
                                                key={mandal._id}
                                                onClick={() => {
                                                    props.history.push(`/mandalProfile/${mandal.mandal_id}`)
                                                }}
                                            >
                                                <center><Card style={{width: '80%', height: 250}} hoverable={true}>
                                                    <h1 style={{textAlign: 'center'}}>{mandal.name} </h1>
                                                </Card></center>

                                            </div>
                                        </Col>
                                    ))
                                ) : (
                                    <Skeleton/>
                                )}


                            </Row>

                        </Content>
                    </Layout>
                </Col>

            </Row>
        </>
    );
}

export default MyMandal;
