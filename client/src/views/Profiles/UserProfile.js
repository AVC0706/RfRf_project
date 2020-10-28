import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Badge, Tabs, Descriptions, Tag } from "antd";
import DataTable from "../../components/dashboard/DataTable";
import axios from "axios";
import UserContext from "../../context/user/userContext";
import Avatar from "antd/lib/avatar/avatar";
import MandalTable from "../../components/dashboard/MandalTable";

const { TabPane } = Tabs;

function UserProfile(props) {
  //start

  const userContext = useContext(UserContext);


  useEffect(() => {
    if (userContext.user) {
      getUser();
    }
  }, [userContext.isAuth]);

  const [user, setuser] = useState({
    name: "User Name",
    city: "",
    district: "",
    state: "",
    country: "",
    qualification: "",
    created_at: null,
    aoi: [],
  });
  const { name, city, district, state, country, qualification, created_at, aoi } = user;

  const getUser = () => {
    console.log(props)
    axios
      .get(`http://localhost:5000/api/user/profile/${props.match.params.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.user)
          setuser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Row>
        <Col md={2}>

        </Col>
        <Col md={20} style={{ backgroundColor: '#fcac44', height: '100vh' }}>
          <Card
            title={name}
            style={{ margin: "10px" }}
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
                <Descriptions title="User Info" bordered>
                  <Descriptions.Item label="City">{city}</Descriptions.Item>
                  <Descriptions.Item label="State">{state}</Descriptions.Item>
                  <Descriptions.Item label="District">
                    {district}
                  </Descriptions.Item>
                  <Descriptions.Item label="Qualification">{qualification}</Descriptions.Item>
                  <Descriptions.Item label="Joined At">{created_at}</Descriptions.Item>
                  <Descriptions.Item label="Area of Interest"><Tag>Area of Interest</Tag></Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Tabs>
                  <TabPane tab="Mandals" key="Mandals">
                    <MandalTable />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={2} />
      </Row>
    </>
  );
}

export default UserProfile;
