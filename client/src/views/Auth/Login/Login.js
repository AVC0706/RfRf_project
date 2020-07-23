import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Card } from "antd";
import styles from './Login.module.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 26
  }
}
const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
    })
  };
  const handleSubmit = () => {
    console.log(user);
  };
  const cardStyle = {
    width: "80%",
    margin: "auto",
  };
  return (
    <Row>
      <Col span = {8}></Col>
      <Col span = {8}>
        <Card title="Login" style = {cardStyle}  className = {styles.card}>
          <Form
            name="login"
            {...layout}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your email ID!",
                  },
                ]}
                
              >
                <Input name="email" value={email}
                  onChange={onChange}
                  className = {styles.input}
                  prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="Email ID"/>
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                
              >
                <Input.Password name="password" 
                value={password}
                onChange={onChange}
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Password" type="password" />
              </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">
              Forgot password
              </a>    
            <Form.Item >
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        </Col>
        <Col span = {8}></Col>
    </Row>
  );
};

export default Login;
