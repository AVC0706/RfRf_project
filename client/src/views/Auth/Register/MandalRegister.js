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

import UserContext from "../../../context/user/userContext";
import MandalContext from "../../../context/mandal/mandalContext";
const { Option } = Select;

function MandalRegister() {
  const userContext = useContext(UserContext);
  const mandalContext = useContext(MandalContext)

  const { Aoi, getAllAoi } = userContext;

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

  const onSubmit = () => {
    mandalContext.addMandal(mandal);
    console.log(mandal);
  };

  const [mandal, setmandal] = useState({
    name: "",
    qualification: "",
    city: "",
    state: "",
    country: "",
    aoi: [],
  });
  const { name, qualification, city, state, country, aoi } = mandal;

  let children = [];
  if (Aoi !== undefined) {
    for (let i = 0; i < Aoi.length; i++) {
      children.push(<Option key={Aoi[i].name}>{Aoi[i].name}</Option>);
    }
  }

  return (
    <Row>
      <Col lg={8} md={2} sm={1} />
      <Col lg={8} md={10} sm={12}>
        <Card title="Register" className="register-card">
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
              <Input name="name" value={name} onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="qualif-input"
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
              name="state-input"
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
              name="country-input"
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
            onClick = {onSubmit}
          >
            Register
          </Button>
        </Card>
      </Col>
      <Col lg={8} md={2} sm={1} />
    </Row>
  );
}

export default MandalRegister;
