import React, { useState } from "react";
import {
    Form,
    Input,
    Select,
  } from 'antd';
  import { UserOutlined, LockOutlined } from '@ant-design/icons';
function RegisterStepTwo() {
    
const layout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 26
    }
  }
  
  const [info, setinfo] = useState({
    qualification: "",
    city: "",
    state: "",
    country: "",
    aoi: "",
  });
  const { qualification, city, state, country, aoi } = info;
  const onChange = (e) => {
    setinfo({
      ...info,
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
              message: "Please input your Qualification!",
            },
          ]}
          label="Qualification"
        >
          <Input
            name="qualification"
            value={qualification}
            onChange={onChange}
            
            placeholder="Qualification"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your city!",
            },
          ]}
          label="State"
        >
          <Input
            name="city"
            value={city}
            onChange={onChange}
            label="City"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="City"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your State!",
            },
          ]}
          label="State"
        >
          <Input
            name="state"
            value={state}
            
            onChange={onChange}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="State"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your Country!",
            },
          ]}
          label="Country"
        >
          <Input
            name="country"
            value={country}
            
            onChange={onChange}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Country"
          />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="engineering">Engineering</Select.Option>
            <Select.Option value="archeology">Archeology</Select.Option>
            <Select.Option value="medicine">Medicine</Select.Option>
            <Select.Option value="law">Law</Select.Option>
            <Select.Option value="history">History</Select.Option>
            <Select.Option value="languages">Languages</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="entrepreneurship">Entrepreneurship</Select.Option>
            <Select.Option value="farming">Farming</Select.Option>
            <Select.Option value="socialscience">Social Science</Select.Option>
            <Select.Option value="economics">Economics</Select.Option>
            <Select.Option value="physicaleducation ">Physical education</Select.Option>
            <Select.Option value="art">Art</Select.Option>
            <Select.Option value="ancientscience">Ancient Science</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterStepTwo;
