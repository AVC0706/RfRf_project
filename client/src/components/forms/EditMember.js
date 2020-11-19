import React, { useContext, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, message, Select} from "antd";
import UserContext from "../../context/user/userContext";

const { Option } = Select;

function AddMember(props) {
    const userContext = useContext(UserContext);

    const { Aoi, getAllAoi } = userContext;

    useEffect(() => {
        getAllAoi();
        children = [];

        // const { adminType } = props;
        // console.log(adminType);
        // setuser({ ...user, admin: adminType });

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
    const uploader = {
        name: "file",
        multiple: true,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
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

    const onSubmit = () => {
        props.hideEditMember();
    };

    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        qualification: "",
        city: "",
        state: "",
        country: "",
        admin: "null",
        aoi: [],
    });
    const {
        name,
        email,
        password,
        qualification,
        city,
        state,
        country,
        aoi,
    } = user;

    const grid = {};

    let children = [];
    if (Aoi !== undefined) {
        for (let i = 0; i < Aoi.length; i++) {
            children.push(<Option key={Aoi[i].name}>{Aoi[i].name}</Option>);
        }
        console.log(children);
    }

    return (
        <>
            <Form
                name="login"
                {...layout}
                initialValues={{
                    remember: true,
                }}
                validateMessages={validateMessages}
            //   onFinish={onFinish}
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
                    <Input name="name" value={name} onChange={onChange} />
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
                    <Input name="email" value={email} onChange={onChange} />
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
                    <Input name="city" value={city} onChange={onChange} label="City" />
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
                    <Input name="state" value={state} onChange={onChange} />
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
                    <Input name="country" value={country} onChange={onChange} />
                </Form.Item>

                <Form.Item label="Area of Interest">
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        onChange={onChangeAOI}
                    >
                        {children}
                    </Select>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                    onClick={onSubmit}
                >
                    Save
               </Button>
            </Form>
        </>
    );
}

export default AddMember;
