import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  message,
  Select,
  Divider,
} from "antd";
import "./Register.css";
import UserContext from "../../../context/user/userContext";

function Register() {

  const userContext = useContext(UserContext)

  const { Aoi , Register, getAllAoi } = userContext

  useEffect(() => {
    getAllAoi();
    console.log(Aoi)

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
    setuser({
      ...user,
      aoi: e,
    });
  };
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    city: "",
    state: "",
    country: "",
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
  return (
    <Row>
      <Col lg={8} md={2} sm={1} />
      <Col lg={8} md={10} sm={12}>
        <Card title="Register" className="register-card">
          <br></br>
          <Form
            name="login"
            {...layout}
            initialValues={{
              remember: true,
            }}
            validateMessages={validateMessages}
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
              <Select mode="multiple" onChange={onChangeAOI}>
                <Select.Option value="engineering">Engineering</Select.Option>
                <Select.Option value="archeology">Archeology</Select.Option>
                <Select.Option value="medicine">Medicine</Select.Option>
                <Select.Option value="law">Law</Select.Option>
                <Select.Option value="history">History</Select.Option>
                <Select.Option value="languages">Languages</Select.Option>
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="entrepreneurship">
                  Entrepreneurship
                </Select.Option>
                <Select.Option value="farming">Farming</Select.Option>
                <Select.Option value="socialscience">
                  Social Science
                </Select.Option>
                <Select.Option value="economics">Economics</Select.Option>
                <Select.Option value="physicaleducation ">
                  Physical education
                </Select.Option>
                <Select.Option value="art">Art</Select.Option>
                <Select.Option value="ancientscience">
                  Ancient Science
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
          <center>
            <Divider plain>OR</Divider>
            Already have an account?
            <a> Sign In</a>
          </center>
        </Card>
      </Col>
      <Col lg={8} md={2} sm={1} />
    </Row>
  );
}

export default Register;
