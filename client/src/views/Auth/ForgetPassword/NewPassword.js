import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    Input,
    Button,
    Divider,
    Row,
    Col,
    Card,
} from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import UserContext from "../../../context/user/userContext";
import SecondNav from "../../../components/navbars/header/altHeader";
import { Link } from "react-router-dom";
function NewPassword(props) {
    const [user, setuser] = useState({
        email: "",
        password: "",
    })
    const { email } = user;
    const onChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        //HandleSubmit;
    };
    return (
        <>
            <SecondNav></SecondNav>
            <Row>
                <Col lg={2} md={2} xs={2} />
                <Col lg={20} md={10} xs={20} >
                    <div style={{ backgroundColor: '#fcac44', height: '100vh' }}>
                        <br></br>
                        <Row>
                            <Col lg={8} md={2} xs={2}>
                                <Button onClick={() => props.history.push('/')} size="large" style={{ backgroundColor: '', margin: "0px 0px 0px 30px", borderColor: "#fcac44" }} shape="round"><p style={{ fontSize: '18px', color: "#fcac44" }}>Home</p></Button>
                            </Col>
                            <Col lg={8}
                            ><Card className="login-card" style={{ backgroundColor: '#f7d3a6' }}>
                                    <h1 style={{ textAlign: 'center' }}>Reset password</h1>
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
                                                prefix={<UserOutlined className="site-form-item-icon" />}
                                                placeholder="Email ID"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="pass"
                                            label="Password"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your password!",
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                name="password"
                                                value={password}
                                                onChange={onChange}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirm"
                                            label="Confirm Password"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please confirm your password!",
                                                },
                                                () => ({
                                                    validator(rule, value) {
                                                        if (!value || password === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            "The two passwords that you entered do not match!"
                                                        );
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password onChange={onChange} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                onClick={handleSubmit}
                                                className="login-form-button"
                                                style={{ background: "#FF8F00", borderColor: "#FF8F00" }}
                                            >
                                                Reset Password
                </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                            <Col lg={8} md={2} xs={2} />
                        </Row>
                    </div>
                </Col>
                <Col lg={2} md={2} sm={1} xs={2} />
            </Row>
        </>
    )
}

export default NewPassword
