import React, {useState, useContext} from "react";
import {Button, Card, Col, Form, Input, Row,} from "antd";
import {UserOutlined} from "@ant-design/icons";
import UserContext from "../../../context/user/userContext";

function ForgetPassword(props) {
    const [user, setuser] = useState({
        email: "",
    })
    const userContext = useContext(UserContext);
    const { email } = user;
    const onChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        userContext.forgetPass(user);
        console.log(user)
    };
    return (
        <>
            <Row>
                <Col lg={2} md={2} xs={2}/>
                <Col lg={20} md={10} xs={20}>
                    <div style={{backgroundColor: '#fcac44', height: '100vh'}}>
                        <br></br>
                        <Row>
                            <Col lg={8} md={2} xs={2}>
                                <Button onClick={() => props.history.push('/')} size="large" style={{
                                    backgroundColor: '',
                                    margin: "0px 0px 0px 30px",
                                    borderColor: "#fcac44"
                                }} shape="round"><p style={{fontSize: '18px', color: "#fcac44"}}>Home</p></Button>
                            </Col>
                            <Col lg={8}
                            ><Card className="login-card" style={{backgroundColor: '#f7d3a6'}}>
                                <h1 style={{textAlign: 'center'}}>Forget password?</h1>
                                <h4 style={{textAlign: 'center'}}>Please enter your email</h4>
                                <hr>
                                </hr>
                                <Form
                                    name="login"
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    <Form.Item
                                        name="email id"
                                        rules={[
                                            {
                                                type: "email",
                                                message: "Please input valid Email ID:",
                                            },
                                        ]}
                                    >

                                        <Input
                                            name="email"
                                            value={email}
                                            prefix={<UserOutlined className="site-form-item-icon"/>}
                                            placeholder="Email ID"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            onClick={handleSubmit}
                                            className="login-form-button"
                                            style={{background: "#FF8F00", borderColor: "#FF8F00"}}
                                        >
                                            Send Email a new password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                            </Col>
                            <Col lg={8} md={2} xs={2}/>
                        </Row>
                    </div>
                </Col>
                <Col lg={2} md={2} sm={1} xs={2}/>
            </Row>
        </>
    )
}

export default ForgetPassword;
