import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button, Tabs, Descriptions, Statistic, Modal, message, Tag } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import UserContext from "../../context/user/userContext";
import axios from "axios";
import MeetingTable from "../../components/dashboard/MeetingTable";
import AddMember from "../../components/forms/AddMember";
import AddMeeting from "../../components/forms/AddMeeting";
import MemberList from "../../components/profiles/MemberList";
const { TabPane } = Tabs;
function MandalProfile(props) {

  const userContext = useContext(UserContext);
  const [meeting, setMeeting] = useState({});
  const [loading, setLoading] = useState(true);
  const [mandalMembers, setmembers] = useState([])
  const [adminUser, setAdminUser] = useState(null)

  useEffect(() => {
    if (userContext.user) {
      getMandal();
      getMembers();
      getMeetings();

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
    city: "",
    district: "",
    state: "",
    cityApproved: false,
    districtApproved: false,
    addMembers_visible: false,
    addMeeting_visible: false,
    members: 0,
    aoi:[]
  });
  const {
    name,
    image,
    city,
    district,
    state,
    addMeeting_visible,
    addMembers_visible,
    districtApproved,
    cityApproved,
    aoi,
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
        `http://localhost:5000/api/mandal/getMandal/${props.match.params.id}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setAdminUser(res.data.adminUser)
          setmandal(res.data.mandal)



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
        `http://localhost:5000/api/mandal/getMembers/${props.match.params.id}`
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
      .get(`http://localhost:5000/api/meeting/getmeeting/${props.match.params.id}`)
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
        "http://localhost:5000/api/mandalAdmin/addMember",
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
      `http://localhost:5000/api/meeting/createmeeting/${props.match.params.id}`,
      meeting,
      config
    ).then(res => {
      console.log(res.data)
      console.log('success')

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
      .delete(`http://localhost:5000/api/meeting/deletemeeting/${id}`)
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
  const approveMandal = () => {
    if (userContext.user.admin === 'district' && mandal.districtApproved === false) {
      axios.put(
        `http://localhost:5000/api/districtAdmin/approveMandal/${props.match.params.id}`,
        mandal
      ).then((res) => {
        console.log("Mandal Approved");
      }).catch((e) => console.log(e));
    }
    else if (userContext.user.admin === 'city' && mandal.cityApproved === false) {
      axios.put(
        `http://localhost:5000/api/cityAdmin/approveMandal/${props.match.params.id}`,
        mandal
      ).then((res) => {
        console.log("Mandal Approved");
      }).catch((e) => console.log(e));
    }
    else {
      console.log("Can't approve");
    }

  };
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Row>
        <Col span={2} />
        <Col span={20} style={{ backgroundColor: '#fcac44', height: '100vh' }}>
          <div >
            <Card
              title={name}
              style={{ margin: "10px" }}
              extra={<><br></br><Statistic title="Next Scheduled Meeting" value="10th Feb 2020"></Statistic>
              </>

              }
              headStyle={{ fontSize: "250%" }}
            > {userContext.user.admin === "district" || userContext.user.admin === "state" || userContext.user.admin === "city" ? <Row>

              <Button
                style={{ marginTop: "0px", float: "right" }}
                type="primary"
              >
                Edit Profile
         </Button>
              <hr></hr>
            </Row> : <></>}
              {(userContext.user.admin === 'district' && mandal.districtApproved === false) || (userContext.user.admin === 'city' && mandal.cityApproved === false) ? <Row>
                <Card>
                  <Col span={4}><h1>Approve Mandal?</h1></Col>
                  <Col span={14}></Col>
                  <Col span={4}><Button
                    style={{ float: "right", margin: "0px 5px 0px 5px" }}
                    type="primary"
                    danger
                    size='large'
                  >
                    No
                </Button>
                    <Button
                      style={{ margin: "0px 5px 0px 5px", float: "right", backgroundColor: "#38BC3D", color: "white" }}
                      size='large'
                      onClick={approveMandal}
                    >
                      Yes
                </Button></Col>


                </Card></Row> : <></>}


              {/*----------- MEMBERS ---------*/}
              <Tabs>
                <TabPane tab="Mandal Information" key="mandalInfo">
                  <Row>
                    <Col span={16}>
                      <Descriptions title="Mandal Info" bordered>

                        <Descriptions.Item label="Pramukh">{adminUser ? adminUser.name : <p>Admin Name</p>}</Descriptions.Item>
                        <Descriptions.Item label="City">{city}</Descriptions.Item>
                        <Descriptions.Item label="State">{state}</Descriptions.Item>
                        <Descriptions.Item label="District">
                          {district}
                        </Descriptions.Item>
                        <Descriptions.Item label="Members">
                          {members}
                        </Descriptions.Item>
                        <Descriptions.Item label="Approval">
                          {mandal.districtApproved ? (<Tag icon={<CheckCircleOutlined />} color="success">
                            Approved
                          </Tag>) :
                            (<Tag icon={<CloseCircleOutlined />} color="error">
                              Not Approved
                            </Tag>)}

                        </Descriptions.Item>
                      </Descriptions>

                      <Card>
                        <p>Area of interests: </p>
                        {aoi ? (aoi.map((aoi_item) => (<Tag>{aoi_item.name}</Tag>))): (<></>)}
                      </Card>

                    </Col>
                    <Col span={2}></Col>
                    <Col span={6}>
                      <MemberList members={mandalMembers}></MemberList>
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
                    </Col>
                  </Row>

                </TabPane>
                {mandal.districtApproved === true ? (<TabPane tab="Meeting Information" key="meetingInfo">
                  <Card>
                    <h1>Past Meeting Details</h1>
                  </Card>
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
                  <br></br>
                  <br></br>
                  <h1>Past Meetings</h1>
                  <MeetingTable meetings={meeting} deleteMeet={deleteMeet} addMom={addmom} ></MeetingTable>
                </TabPane>) : (<TabPane tab="Meeting Information" disabled key="meetingInfo"></TabPane>)}
              </Tabs>
            </Card>
          </div>

        </Col>
        <Col span={2} />
      </Row>
    </>
  );
}

export default MandalProfile;
