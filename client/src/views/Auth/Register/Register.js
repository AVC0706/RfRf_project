import React, {useContext, useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Card, Col, Form, Input, message, Row, Select,} from "antd";
import "./Register.css";
import UserContext from "../../../context/user/userContext";
import {districts, states} from "./Mock";

const {Option} = Select;

function Register(props) {
    const userContext = useContext(UserContext);
    const [form] = Form.useForm();
    const {Aoi, getAllAoi} = userContext;

    useEffect(() => {
        console.log(districts)
        console.log(states)
    }, [])


    useEffect(() => {
        getAllAoi();
        children = [];

        const {adminType} = props;
        console.log(props.adminType);
        setuser({...user, admin: adminType});

        // eslint-disable-next-line
    }, []);

    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 26,
        },
    };

    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not validate email!",
            number: "${label} is not a validate number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    const onChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeAOI = (e) => {
        console.log(e);
        setuser({
            ...user,
            aoi: e,
        });
    };

    const onChangeState = (e) => {
        console.log(e);
        setuser({
            ...user,
            state: e,
            district: null
        });
    }

    const onChangeDistrict = (e) => {
        console.log(e);
        setuser({
            ...user,
            district: e,
        });
    }

    const onSubmit = () => {
        userContext.register(user);
        //props.setState({...props.state, modalVisible: false});
        message.success("User Created");
        console.log(user);
        console.log(user.admin);
        console.log(props.adminType);
    };

    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        qualification: "",
        city: "",
        state: "",
        country: "India",
        district: "",
        admin: "null",
        aoi: [],
    });
    const {
        name,
        email,
        password,
        qualification,
        city,
        country,
    } = user;
    let children = [];
    if (Aoi !== undefined) {
        for (let i = 0; i < Aoi.length; i++) {
            children.push(<Option key={Aoi[i].name}>{Aoi[i].name}</Option>);
        }
        console.log(children);
    }
    return (
        <>
            <Row>
                <br></br>
                <Col>
                    <Card className="register-card" style={{backgroundColor: '#f7d3a6', marginTop: '10%'}}>
                        <h1 style={{textAlign: 'center'}}>User Register</h1>
                        <h4 style={{textAlign: 'center'}}>Please enter your E-mail and Password</h4>
                        <hr>
                        </hr>
                        <Form
                            name="login"
                            {...layout}
                            initialValues={{
                                remember: true,
                            }}
                            validateMessages={validateMessages}
                            onFinish={onSubmit}
                            form={form}
                        >
                            <Form.Item
                                name="name-item"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <Input name="name" value={name} onChange={onChange}/>
                            </Form.Item>
                            <Form.Item
                                name="email id"
                                label="E-mail ID"
                                rules={[
                                    {
                                        type: "email",
                                        required: true,
                                        message: "Please input your Email ID!",
                                    },
                                ]}
                            >
                                <Input name="email" value={email} onChange={onChange}/>
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
                                <Input.Password onChange={onChange}/>
                            </Form.Item>
                            <Form.Item
                                name="qualif"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Qualification!",
                                    },
                                ]}
                                label="Qualification"
                            >
                                <Input
                                    name="qualification"
                                    value={qualification}
                                    onChange={onChange}
                                />
                            </Form.Item>

                            <Form.Item
                                name="city_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your city!",
                                    },
                                ]}
                                label="City"
                            >
                                <Input
                                    name="city"
                                    value={city}
                                    onChange={onChange}
                                    label="City"
                                />
                            </Form.Item>
                            <Form.Item
                                name="state_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your State!",
                                    },
                                ]}
                                label="State"
                            >
                                <Select
                                    mode="single"
                                    style={{width: '100%'}}
                                    placeholder="Please select state"
                                    onChange={onChangeState}
                                >
                                    {states.map(state => {
                                        return (
                                            <Option key={state}>{state}</Option>
                                        )
                                    })}
                                </Select>
                                {/* <Input name="state" value={state} onChange={onChange} /> */}
                            </Form.Item>
                            <Form.Item
                                name="district_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your District!",
                                    },
                                ]}
                                label="District"
                            >
                                <Select
                                    value={user.district}
                                    mode="single"
                                    style={{width: '100%'}}
                                    placeholder="Please select state"
                                    onChange={onChangeDistrict}
                                >
                                    {user.state && districts[user.state].map(district => {
                                        return (
                                            <Option key={district}>{district}</Option>
                                        )
                                    })}
                                </Select>
                                {/* <Input
                  name="district"
                  value={district}
                  onChange={onChange}
                  label="District"
                /> */}
                            </Form.Item>
                            <Form.Item
                                name="country_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Country!",
                                    },
                                ]}
                                label="Country"
                            >
                                <Input name="country" value={country} onChange={onChange}/>
                            </Form.Item>

                            <Form.Item label="Area of Interest">
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Please select"
                                    onChange={onChangeAOI}
                                >
                                    {children}
                                </Select>
                            </Form.Item>
                        </Form>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-form-button"
                            onClick={onSubmit}
                        >
                            Register
                        </Button>

                        {/* <center>
            <Divider plain>OR</Divider>
            Already have an account?
            <a> Sign In</a>
          </center> */}
                    </Card>
                </Col>
            </Row>

        </>


    );
}

export default Register;
