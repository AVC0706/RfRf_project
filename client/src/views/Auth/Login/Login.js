import React, { useState, useContext, useEffect } from "react";
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
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import UserContext from "../../../context/user/userContext";
import SecondNav from "../../../components/navbars/header/altHeader";
import { Link } from "react-router-dom";

const Login = (props) => {
  const userContext = useContext(UserContext);
  const { isAuth } = userContext


  //Route User according to Admin Status
  useEffect(() => {
    if (isAuth && userContext.user !== null) {

      if (userContext.user.admin.toLowerCase() !== 'null') {
        props.history.push('/dashboard')
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
        <Col lg={2} md={2} xs={2} />
        <Col lg={20} md={10} xs={20} >
          <div style={{ backgroundColor: '#fcac44', height: '100vh' }}>
            <br></br>
            <Row>
              <Col lg={8} md={2} xs={2}>
                <Button onClick={()=> props.history.push('/')} size="large" style={{backgroundColor:'',margin:"0px 0px 0px 30px",borderColor:"#fcac44"}}shape="round"><p style={{fontSize:'18px', color:"#fcac44"}}>Home</p></Button>
              </Col>
              <Col lg={8}
              ><Card className="login-card" style={{ backgroundColor: '#f7d3a6' }}>
                  <h1 style={{ textAlign: 'center' }}>Login</h1>
                  <h4 style={{ textAlign: 'center' }}>Please enter all details</h4>
                  <hr>
                  </hr>
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
                        prefix={<KeyOutlined />}
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
                        style={{ background: "#FF8F00", borderColor: "#FF8F00" }}
                      >
                        Login
                </Button>
                    </Form.Item>
                  </Form>
                  <center>
                    <Link to = "/forgetPassword">Forgot password?</Link>
                    <Divider plain>OR</Divider>
                  Don't have an account?
                  <Link to="/register"> Register</Link>
                  </center>
                </Card>
              </Col>
              <Col lg={8} md={2} xs={2} />
            </Row>
          </div>
        </Col>
        <Col lg={2} md={2} sm={1} xs={2} />
      </Row>
    </>
  );
};

export default Login;
