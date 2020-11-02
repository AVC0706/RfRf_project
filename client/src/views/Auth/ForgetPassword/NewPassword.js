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
import Password from "antd/lib/input/Password";
function NewPassword(props) {
    const [user, setuser] = useState({
        password: "",
    })
<<<<<<< HEAD
    const { email } = user;
    const userContext = useContext(UserContext);
=======
    const { email, password } = user;
>>>>>>> bddd46470a3da7140d3b69f4607f87e4e0d70d09
    const onChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        //HandleSubmit;
        userContext.resetPass(user, props.match.params.id)
    };
    return (
        <>
            <Row>
                <Col lg={2} md={2} xs={2} />
                <Col lg={20} md={10} xs={20} >
                    <div style={{ backgroundColor: '#fcac44', height: '100vh' }}>
                        <br></br>
                        <Row>
                            <Col lg={8} md={2} xs={2}>
                                
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
                                                 value={Password}
                                                onChange={onChange}
                                            />
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
