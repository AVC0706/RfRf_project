import React, {useState,useEffect,useContext} from 'react'
import {Button, Divider, Modal} from "antd";
import axios from "axios";
import UserContext from "../../context/user/userContext";


function MeetingDetails(props) {
    const [meetingVisible, setmeetingVisible] = useState({modalVisible: false});
    const {modalVisible} = meetingVisible;
    const userContext = useContext(UserContext);
    const handleView = () => {
        setmeetingVisible({...meetingVisible, modalVisible: true})
    };
    const [momurl,setmomUrl] = useState({});
    useEffect(() => {
        if (userContext.user) {
            geturl();
        }


    }, [userContext.isAuth]);

    const geturl = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + `/document/getmomurl/${props.meeting._id}`)
        .then((res)=> {
            if(res.status === 200) {
                setmomUrl(res.data);
            }
        }).catch(e => {
            console.log(e.message);
        })
    }
    return (
        <div>
            <Button type="primary" onClick={handleView}>View</Button>
            <Modal

                visible={modalVisible}
                onCancel={() => {
                    setmeetingVisible({modalVisible: false})
                }}
            >
                <h1>{props.meeting.name}</h1>
                <Divider />
                <h4>Held at: {props.meeting.date}</h4>
                <h3>Meeting Agenda: {props.meeting.agenda}</h3>
                <h4>Attached Document <a href={momurl} target="__blank">Click Here</a></h4>


            </Modal>

        </div>
    )
}

export default MeetingDetails;
