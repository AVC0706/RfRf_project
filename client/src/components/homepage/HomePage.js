import React from "react";
import { Carousel, Card, Col, Row } from "antd";
import "./HomePage.css";

const contentStyle = {
  height: "90vh",
  width: "100vw",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const { Meta } = Card;

const HomePage = () => {
  return (
    <>
      <div className="carousel">
        <Carousel autoplay>
          <div>
            <img src="assets\images\1-2.jpg" style={contentStyle} />
          </div>
          <div>
            <img src="assets\images\2-1.jpg" style={contentStyle} />
          </div>
          <div>
            <img src="assets\images\3-1.jpg" style={contentStyle} />
          </div>
          <div>
            <img src="assets\images\h1.jpeg" style={contentStyle} />
          </div>
          <div>
            <img src="assets\images\h2.jpeg" style={contentStyle} />
          </div>
          <div>
            <img src="assets\images\h3.jpeg" style={contentStyle} />
          </div>
        </Carousel>
      </div>
      <div className="updates">
        UPDATES: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div className="VM">
        <Row>
          <Col span={12}>
            <h2>OUR VISION</h2>
            <p className="info">
              RFRF Envisages Bharat as a Strong Contributor to Global
              Scientific, Technological and Academic Research in all Fields of
              Knowledge Bringing Wellbeing of Humans and Protection of the
              Environment
            </p>
          </Col>

          <Col span={12}>
            <h2>OUR MISSION</h2>
            <p className="info">
              Global Level Advanced Research Centre for varied fields as an
              integrating platform for Scientific Community of the World and
              Traditional Researchers in all fields of Knowledge
            </p>
          </Col>
        </Row>
      </div>
      <div className="action">
        <h1 style={{ fontSize: "3rem", marginBottom: "25px" }}>
          RFRF in Action
        </h1>
        <br />
        <br />
        <h2> Keep up with the dynamic flow of activities </h2>
        <br />
        <br />
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8} style={{ textAlign: "center" }}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://rfrfoundation.org/wp-content/uploads/2020/07/2-600x450.jpeg"
                  />
                }
              >
                <Meta
                  title="RFRF and AICTE sign MoU to work for self-reliant Bharat"
                  description="RFRF and AICTE sign MoU to work for self-reliant Bharat New Delhi/ 29 June, 2020 Research for Resurgence Foundation (RFRF), Nagpur on Monday signed a Memorandum [...]"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://rfrfoundation.org/wp-content/uploads/2020/02/DSC6768-600x271.jpg"
                  />
                }
              >
                <Meta
                  title="Impactful Research Design & Funding Resources : IRD 2020"
                  description="Impactful Research Design & Funding Resources : IRD 2020 Research for Resurgence Foundation, Nagpur and National Assessment & Accreditation Council, an Autonomous Institution of the University [...]"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://rfrfoundation.org/wp-content/uploads/2019/12/DSC82071-600x339.jpg"
                  />
                }
              >
                <Meta
                  title="Impactful Research Design & Funding Resources : IRD 2020"
                  description="Assessor’s Orientation Programme National Assessment & Accreditation Council (NAAC), an Autonomous Institution of the University Grants Commission(UGC), Bengaluru and Research for Resurgence Foundation (RFRF), an initiative [...]"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="features">
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Research" bordered={false}>
                <ul style={{ textAlign: "left" }}>
                  <li>Basic & Applied Research</li>
                  <li>Mission Mode Projects</li>
                  <li>Pilot Demonstrations</li>
                  <li>Documentation of Grass-Root Innovations</li>
                </ul>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Researchers" bordered={false}>
                <ul style={{ textAlign: "left" }}>
                  <li>Training Development</li>
                  <li>Fellowships to Researcher</li>
                  <li>IPR Support</li>
                  <li>Critical Mass of Researchers</li>
                </ul>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Resources" bordered={false}>
                <ul style={{ textAlign: "left" }}>
                  <li>Knowledge Resurce Center</li>
                  <li>Fund Generation & Management</li>
                  <li>Industrial Networking</li>
                  <li>Seamless Pooling and Sharing</li>
                </ul>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Reach" bordered={false}>
                <ul style={{ textAlign: "left" }}>
                  <li>Technology Park</li>
                  <li>Publication</li>
                  <li>Industry Interaction</li>
                  <li>Media Interaction</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="associates">
        <h1 style={{ fontSize: "3rem", marginBottom: "5%" }}>
          Academic Associates
        </h1>
        <Row>
          <Col span={4}>LOGO</Col>
          <Col span={4}>LOGO</Col>
          <Col span={4}>LOGO</Col>
          <Col span={4}>LOGO</Col>
          <Col span={4}>LOGO</Col>
          <Col span={4}>LOGO</Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
