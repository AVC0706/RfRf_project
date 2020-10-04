import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Badge, Tabs, Descriptions, Modal, message, Layout } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import DataTable from "../../components/dashboard/DataTable";
import UserContext from "../../context/user/userContext";
import axios from "axios";
import MeetingTable from "../../components/dashboard/MeetingTable";
import AddMember from "../../components/forms/AddMember";
import AddMeeting from "../../components/forms/AddMeeting";
import MandalTable from "../../components/dashboard/MandalTable";
import Navbar from "../../components/navbars/header/header";

const { Header } = Layout;
const { TabPane } = Tabs;
function MandalProfile(props) {

  const userContext = useContext(UserContext);
  const [meeting, setMeeting] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userContext.user) {
      getMandal();
      getMembers();
      getMeetings();

    }


  }, [userContext.isAuth]);

  const [mandalMembers, setmembers] = useState([])


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
    setmandal({ ...mandal, addMembers_visible: true });
  };


  const showAddMeeting = () => {
    setmandal({ ...mandal, addMeeting_visible: true });
  };


  const getMandal = () => {
    console.log(props);
    axios
      .get(
        `http://13.232.76.242:5000/api/mandal/getMandal/${props.match.params.id}`
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


  const getMembers = () => {
    console.log(props);
    axios
      .get(
        `http://13.232.76.242:5000/api/mandal/getMembers/${props.match.params.id}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setmembers(res.data.members);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMeetings = () => {
    axios
      .get(`http://13.232.76.242:5000/api/meeting/getmeeting/${props.match.params.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMeeting(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideAddMembers = (e) => {
    setmandal({ ...mandal, addMembers_visible: false });
  };


  const hideAddMeetings = () => {
    setmandal({ ...mandal, addMeeting_visible: false });
  };


  const AddMembers = (user) => {
    console.log(user);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "http://13.232.76.242:5000/api/mandalAdmin/addMember",
        {
          user,
          mandal_id: props.match.params.id,
          mandal_name: name,
          role: null,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        console.log("success");
        props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
    setmandal({ ...mandal, addMembers_visible: false });
  };

  const AddMeetings = (meeting) => {
    console.log(meeting);
    const config = {
      header: {
        "Content-Type": "application/json"
      },
    };

    axios.post(
      `http://13.232.76.242:5000/api/meeting/createmeeting/${props.match.params.id}`,
      meeting,
      config
    ).then(res => {
      console.log(res.data)
      console.log('success')
      props.history.push('/')

    }).catch(e => {
      console.log(e)
    })
    setmandal({ ...mandal, addMeeting_visible: false })
  };

  const deleteMeet = (id, name) => {
    const key = "updatable";
    message.loading({ content: "Deleting...", key });

    console.log("deleteteD0");
    setLoading(true);

    axios
      .delete(`http://13.232.76.242:5000/api/meeting/deletemeeting/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getMeetings();
        }
        else {
          getMeetings();
        }

        message.success({ content: "User Deleted !!", key, duration: 3 });

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const addmom = (id, meet) => {
    console.log(meet);
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    };
    axios.put(`http://localhost:5000/api/meeting/addmom/${id}`, meet, config)
      .then(res => {
        console.log(res.data);
        console.log('success');
      }).catch(err => {
        console.log(err)
      })

  };
  return (
    <>
      <Navbar></Navbar>
      <Row>
        <Col span = {2} />
        <Col span = {20}>
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
            {/*----------- MEMBERS ---------*/}

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
                      onCancel={hideAddMembers}
                    >
                      <AddMember addMember={AddMembers}></AddMember>
                    </Modal>

                    <DataTable users={mandalMembers}></DataTable>
                  </TabPane>

                  {/*----------- MEETINGS ---------*/}

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
                      onCancel={hideAddMeetings}
                    >
                      <AddMeeting addMeeting={AddMeetings}></AddMeeting>
                    </Modal>
                    <MeetingTable meetings={meeting} deleteMeet={deleteMeet} addMom={addmom} ></MeetingTable>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span = {2} />
      </Row>
    </>
  );
}

export default MandalProfile;
