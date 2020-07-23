import React,{ Component, useState }     from "react";
import { Form, Input, Row, Col,} from "antd";
import "antd/dist/antd.css";

export default function UserRegister() {
  const [user, setuser] = useState({
    name:"",
    email:"",
    password:"",
    qualification:""
  })
  const {name,email,password,qualification} = user
  const onChange = (e) =>
  {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    })
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };
  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <Form {...layout} name="Register">
          <Form.Item label="Name">
          <Input name="name" value={name}
                onChange={onChange} />
          </Form.Item>
          <Form.Item label="Email ID">
          <Input name="email" value={email}
                onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password name="password" value={password}
                onChange={onChange} />
          </Form.Item>
          <Form.Item label="Qualification">
          <Input name="qualification" value={qualification}
                onChange={onChange} />
          </Form.Item>
        </Form>
      </Col>
      <Col span={8} />
    </Row>
  );
}
