import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Badge, Tabs, Descriptions, Modal } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import DataTable from "../../components/dashboard/DataTable";
import UserContext from "../../context/user/userContext";
import axios from "axios";
import MeetingTable from "../../components/dashboard/MeetingTable";
import AddMember from "../../components/forms/AddMember";
import AddMeeting from "../../components/forms/AddMeeting";

const { TabPane } = Tabs;
function MandalProfile(props) {
  const userContext = useContext(UserContext);
  const [meeting, setMeeting] = useState([]);

  useEffect(() => {
    if (userContext.user) {
      getMandal();
    }
    getMeetings();

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
    addMembers_visible: false,
    addMeeting_visible: false,
    members: 0,
  });
  const {
    name,
    image,
    city,
    admin,
    district,
    state,
    addMeeting_visible,
    addMembers_visible,
    country,
    approved,
    members,
  } = mandal;
  const showAddMembers = () => {
    setmandal({ ...mandal, addMembers_visible: true })
  }
  const showAddMeeting = () => {
    setmandal({ ...mandal, addMeeting_visible: true })
  }
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
  const hideAddMembers = e => {
    setmandal({ ...mandal, addMembers_visible: false })
  };
  const hideAddMeetings = () =>
  {
    setmandal({ ...mandal, addMeeting_visible: false })
  }
  const AddMembers = e => {
    console.log(e);
    setmandal({ ...mandal, addMembers_visible: false })
  };
  const AddMeetings = (meeting) => {
    console.log(meeting);
    const config  =  {
      header: {
        "Content-Type": "application/json"
      },
    };

    axios.post(
      `http://localhost:5000/api/meeting/createmeeting/${props.match.params.id}`,
      meeting,
      config
    ).then(res => {
      console.log(res.data)
        console.log('success')
        props.history.push('/')

    }).catch(e =>{
      console.log(e)
    })
    setmandal({ ...mandal, addMeeting_visible: false })
  };

  const getMeetings = () => {
    axios
      .get(`http://localhost:5000/api/meeting/getmeeting/${props.match.params.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMeeting(res.data);
          console.log(meeting);
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
                  <Button
                      type="primary"
                      shape="round"
                      size="large"
                      icon={<AiOutlineUserAdd></AiOutlineUserAdd>}
                      onClick={showAddMembers}
                    >
                      Add Members
                    </Button>
                    <Modal
                      title="Add Members"
                      visible={addMembers_visible}
                      footer={null}
                      onCancel = {hideAddMembers}
                    >
                      <AddMember addMember = {AddMembers}></AddMember>
                    </Modal>
                    <DataTable></DataTable>
                    
                  </TabPane>
                  <TabPane tab="Meetings" key="Meetings">
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      icon={<AiOutlineUserAdd></AiOutlineUserAdd>}
                      onClick={showAddMeeting}
                    >
                      Add Meeting
                    </Button>
                    <Modal
                      title="Add Members"
                      visible={addMeeting_visible}
                      footer={null}
                      onCancel = {hideAddMeetings}
                    >
                      <AddMeeting addMeeting = {AddMeetings}></AddMeeting>
                    </Modal>
                    <MeetingTable getMeetings={getMeetings} ></MeetingTable>
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
