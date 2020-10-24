import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Badge, Tabs, Descriptions } from "antd";
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
    if (userContext.user){
      getUser();
    }
  }, [userContext.isAuth]);

  const [user, setuser] = useState({
    name: "User Name",
    image: (
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    ),
    city: "",
    district: "",
    state: "",
    country: "",
  });
  const { name, image, city, district, state, country } = user;

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
        <Col md={20}>
          <Card
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
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              />
              <h1>{name}</h1>
              <Col md={24}>
                <Descriptions title="User Info" bordered>
                  <Descriptions.Item label="City">{city}</Descriptions.Item>
                  <Descriptions.Item label="State">{state}</Descriptions.Item>
                  <Descriptions.Item label="District">
                    {district}
                  </Descriptions.Item>
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
