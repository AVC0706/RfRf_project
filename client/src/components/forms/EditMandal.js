import React, {useContext, useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Form, Input, Row, Select,} from "antd";

import axios from "axios";
import UserContext from "../../context/user/userContext";
import {districts, states} from "./Mock";

const {Option} = Select;

function EditMandal(props) {
    const userContext = useContext(UserContext);

    const {Aoi, getAllAoi} = userContext;
    const [mandal, setmandal] = useState({
        name: "",
        district: "",
        city: "",
        state: "",
        country: "India",
        aoi: [],
    });
    const {name, district, city, state, country, aoi} = mandal;
    useEffect(() => {
        if (userContext.user) {
            getMandal();
        }
        getAllAoi();
        children = [];

        // eslint-disable-next-line
    }, []);
    const getMandal = () => {
        console.log(props);
        axios
            .get(
                process.env.REACT_APP_SERVER_URL + `/mandal/getMandal/${props.mandalID}`
            )
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setmandal(res.data.mandal)

                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const layout = {
        labelCol: {
            span: 10,
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
        axios.patch(process.env.REACT_APP_SERVER_URL + `/api/user/updateMandalProfile/${props.mandalID}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error.data)
            })

        props.hideEditMandal();
    };
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
                            value={state}
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
            </Row>
            <Row>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onSubmit}
                >
                    Save
                </Button>
            </Row>
        </>

    );
}

export default EditMandal;
