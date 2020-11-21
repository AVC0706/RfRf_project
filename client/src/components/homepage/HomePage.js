import React from "react";
import {Card, Carousel, Col, Row} from "antd";
import "./HomePage.css";

const contentStyle = {
    height: "75vh",
    width: "100vw",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

const {Meta} = Card;

const HomePage = () => {
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Row>
                <Col span={2}/>
                <Col span={20}>
                    <div className="carousel">
                        <Carousel autoplay>
                            <div>
                                <img src="assets\images\1-2.jpg" style={contentStyle}/>
                            </div>
                            <div>
                                <img src="assets\images\2-1.jpg" style={contentStyle}/>
                            </div>
                            <div>
                                <img src="assets\images\3-1.jpg" style={contentStyle}/>
                            </div>
                            <div>
                                <img src="assets\images\h1.jpeg" style={contentStyle}/>
                            </div>
                            <div>
                                <img src="assets\images\h2.jpeg" style={contentStyle}/>
                            </div>
                            <div>
                                <img src="assets\images\h3.jpeg" style={contentStyle}/>
                            </div>
                        </Carousel>
                    </div>
                    <div className="VM">
                        <Row>
                            <Col span={12}>
                                <h2>LATEST NEWS</h2>
                                <p className="info">
                                    Bharatiya Shikshan Mandal’s General Body Meet was virtually organized on 25 and 26
                                    July 2020. Two resolutions on the challenges of online education and education for
                                    self-reliant Bharat were passed in this two-day meeting to revolutionise and promote
                                </p>
                            </Col>

                            <Col span={12}>
                                <h2>LATEST ARTICLES</h2>
                                <p className="info">
                                    राष्ट्रीय शिक्षा नीति
                                    विष्णुपुराण में कहा गया है - तत् कर्म यन्न बंधाय सा विद्या या विमुक्तये। आया साया
                                    परं कर्म विद्यान्या शिल्प नैपुणम्।।
                                </p>
                            </Col>
                        </Row>
                    </div>
                    //#region Commented Code
                    {/* <div className="action">
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
                    </div> */}
                    ////#endregion
                </Col>
                <Col span={2}/>
            </Row></>

    );
};

export default HomePage;
