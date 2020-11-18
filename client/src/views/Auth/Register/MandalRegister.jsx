import React, {useContext, useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Card, Col, Form, Input, Row, Select,} from "antd";

import axios from "axios";
import UserContext from "../../../context/user/userContext";
import {districts, states} from "./Mock";

const {Option} = Select;

function MandalRegister(props) {
    const userContext = useContext(UserContext);

    const {Aoi, getAllAoi} = userContext;

    useEffect(() => {
        getAllAoi();
        children = [];

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
    const cardStyle = {
        width: "80%",
        margin: "auto",
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
        setmandal({
            ...mandal,
            [e.target.name]: e.target.value,
        });
    };
    const onChangeAOI = (e) => {
        setmandal({
            ...mandal,
            aoi: e,
        });
    };

    const onChangeState = (e) => {
        setmandal({
            ...mandal,
            state: e,
            district: null
        });
    };

    const onChangeDistrict = (e) => {
        setmandal({
            ...mandal,
            district: e,
        });
    };

    const onSubmit = () => {
        console.log(mandal);

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        axios.post(
            process.env.REACT_APP_SERVER_URL + "/mandal/createMandal",
            mandal,
            config
        ).then(res => {
            console.log(res.data)
            console.log('success')
            props.history.push('/')

        }).catch(e => {
            console.log(e)
        })

    };

    const [mandal, setmandal] = useState({
        name: "",
        district: "",
        city: "",
        state: "",
        country: "India",
        aoi: [],
    });
    const {name, district, city, state, country, aoi} = mandal;

    let children = [];
    if (Aoi !== undefined) {
        for (let i = 0; i < Aoi.length; i++) {
            children.push(<Option key={Aoi[i].name}>{Aoi[i].name}</Option>);
        }
    }

    return (
        <>
            {/* <SecondNav></SecondNav> */}
            <Row>
                <Col span={2}/>
                <Col span={20}>
                    <div style={{backgroundColor: '#fcac44', height: '100vh'}}>
                        <Row>
                            <Col lg={8} md={2} sm={1}/>
                            <Col lg={8} md={10} sm={12}>
                                <Card title="Mandal Register" className="register-card">
                                    <br></br>
                                    <Form
                                        name="mandal_register"
                                        validateMessages={validateMessages}
                                        {...layout}
                                        initialValues={{
                                            remember: true,
                                        }}
                                    >
                                        <Form.Item
                                            name="name-item"
                                            label="Mandal Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input Mandal name!",
                                                },
                                            ]}
                                        >
                                            <Input name="name" value={name} onChange={onChange}/>
                                        </Form.Item>

                                        <Form.Item
                                            name="city-input"
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
                                                value={mandal.district}
                                                mode="single"
                                                style={{width: '100%'}}
                                                placeholder="Please select state"
                                                onChange={onChangeDistrict}
                                            >
                                                {mandal.state && districts[mandal.state].map(district => {
                                                    return (
                                                        <Option key={district}>{district}</Option>
                                                    )
                                                })}</Select>
                                        </Form.Item>
                                        <Form.Item label="Area of Interest">
                                            <Select
                                                mode="multiple"
                                                style={{width: "100%"}}
                                                placeholder="Please select"
                                                onChange={onChangeAOI}
                                                required
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
                                </Card>
                            </Col>
                            <Col lg={8} md={2} sm={1}/>
                        </Row>
                    </div>

                </Col>
                <Col span={2}></Col>

            </Row>
        </>

    );
}

export default MandalRegister;
