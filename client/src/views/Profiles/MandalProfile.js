import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Badge, Tabs, Descriptions } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import DataTable from "../../components/dashboard/DataTable";
import UserContext from "../../context/user/userContext";
import axios from "axios";
import MeetingTable from "../../components/dashboard/MeetingTable";

const { TabPane } = Tabs;
function MandalProfile(props) {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      getMandal();
    }
  }, [userContext.isAuth]);

  const [mandal, setmandal] = useState({
    name: "Mandal Name",
    image: (
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    ),
    admin: <a>Admin Profile</a>,
    city: "",
    district: "",
    state: "",
    country: "",
    approved: "",
    members: 0,
  });
  const {
    name,
    image,
    city,
    admin,
    district,
    state,
    country,
    approved,
    members,
  } = mandal;

  const getMandal = () => {
    console.log(props);
    axios
      .get(
        `http://localhost:5000/api/mandal/getMandal/${props.match.params.id}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setmandal(res.data.mandal);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <Card style={{ padding: "2em", margin: "2em" }} cover={image}>
            <div>
              <p>Area of interests</p>
              Education
              {/* Put all interests here */}
            </div>
          </Card>
        </Col>
        <Col md={16} style={{ margin: "3em" }}>
          <Card
            title={name}
            extra={
              <Button
                style={{ marginTop: "0px", float: "right" }}
                type="primary"
              >
                Edit Profile
              </Button>
            }
            headStyle={{ fontSize: "250%" }}
          >
            <Row>
              <Col md={24}>
                <Descriptions title="Mandal Info" bordered>
                  <Descriptions.Item label="Admin">{admin}</Descriptions.Item>
                  <Descriptions.Item label="City">{city}</Descriptions.Item>
                  <Descriptions.Item label="State">{state}</Descriptions.Item>
                  <Descriptions.Item label="District">
                    {district}
                  </Descriptions.Item>
                  <Descriptions.Item label="Members">
                    {members}
                  </Descriptions.Item>
                  <Descriptions.Item label="Approval">
                    <Badge status="success" text="Approved" />
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Tabs>
                <TabPane tab="Members" key="Members">
                    <DataTable></DataTable>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      icon={<AiOutlineUserAdd></AiOutlineUserAdd>}
                    >
                      Add Members
                    </Button>
                  </TabPane>
                  <TabPane tab="Meetings" key="Meetings">
                  <Button
                      type="primary"
                      shape="round"
                      size="large"
                      icon={<AiOutlineUserAdd></AiOutlineUserAdd>}
                    >
                      Add Meeting
                    </Button>
                    <MeetingTable></MeetingTable>
                    
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4} xs={2} />
      </Row>
    </>
  );
}

export default MandalProfile;
