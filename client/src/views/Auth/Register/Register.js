import React from 'react';
import 'antd/dist/antd.css';
import { Steps, Button, message,Row, Col, Card } from 'antd';
import RegisterStepOne from './RegisterStepOne';
import RegisterStepTwo from './RegisterStepTwo';

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: <RegisterStepOne />,
  },
  {
    title: 'Second',
    content: <RegisterStepTwo/>
  },
];

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const cardStyle = {
      width: "80%",
      margin: "auto",
    };
    return (
      <Row>
      <Col span = {8}></Col>
      <Col span = {8}>
        <Card title="Login" style = {cardStyle}>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <>
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Submit
            </Button>
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
            Previous
          </Button>
          </>
          )}
        </div>
        </Card>
        </Col>
        <Col span = {8}></Col>
    </Row>
    );
  }
}

export default Register