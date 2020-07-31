import React ,{useState}from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Card, message, Select } from "antd";
function MandalRegister() {
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
  const [mandal, setmandal] = useState({
    name: "",
    qualification: "",
    city: "",
    state: "",
    country: "",
    aoi: [],
  });
  const temp = mandal;
  const {
    name,
    qualification,
    city,
    state,
    country,
    aoi,
  } = mandal;

  const onSubmit = () =>
  {
    if(temp === mandal)
    {
      message.error("Dont go!");
    }
  };
  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <Card title="Register a Mandal" style={cardStyle}>
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
            name = "qualif-input"
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
              name = "city-input"
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
            name = "state-input"
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
            name = "country-input"
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
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Card>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
}

export default MandalRegister;
