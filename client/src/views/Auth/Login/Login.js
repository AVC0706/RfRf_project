import React, {  useState, useContext, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Divider,
  Row,
  Col,
  Card,
} from "antd";
import "./Login.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import UserContext from "../../../context/user/userContext";

const Login = (props) => {
  const userContext = useContext(UserContext);

  const { isAuth } = userContext


  //Route User according to Admin Status
  useEffect(() => {
    if (isAuth && userContext.user !== null) {

      if (userContext.user.admin === "state") {
        props.history.push('/stateAdmin')
      }
      else {
        props.history.push('/')
      }

    }
    // eslint-disable-next-line
  }, [isAuth, userContext.user]);


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

  const { email, password } = user;

  const onChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    userContext.login(user, props.history);
    console.log(user);
    // props.history.push('/stateAdmin')
  };

  return (
    <>
      <Row>
        <Col lg={8} md={2} xs={2} />
        <Col lg={8} md={10} xs={20} >
          <br></br>
          <Card title="Login" className="login-card" >
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email id"
                rules={[
                  {
                    type: "email",
                    message: "Please input valid Email ID:",
                  },
                ]}
              >

                <Input
                  name="email"
                  value={email}
                  onChange={onChange}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email ID"
                />
              </Form.Item>
              <Form.Item
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  type="password"
                />
              </Form.Item>
              {/* <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  className="login-form-button"
                >
                  Login
                  </Button>
              </Form.Item>
            </Form>
            <center>
              <a href="">Forgot password?</a>
              <Divider plain>OR</Divider>
                    Don't have an account?
                    <a >  Register</a>
            </center>
          </Card>
        </Col>
        <Col lg={8} md={2} sm={1} xs = {2}/>
      </Row>
    </>
  );
};

export default Login;
