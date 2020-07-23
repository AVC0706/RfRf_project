import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Card } from "antd";

function RegisterStepOne() {
  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 26,
    },
  };
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const {email ,password} = user;
  const onChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
        <br></br>
      <Form
        name="login"
        {...layout}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your email ID!",
            },
          ]}
          label = "E-mail ID"
        >
          <Input
            name="email"
            value={email}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          label = "Password"
          hasFeedback
        >
          <Input.Password
            name="password"
            value={password}
            onChange={onChange}
            type="password"
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
            <Input.Password />
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterStepOne;
