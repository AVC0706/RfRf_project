import React,{useState} from 'react'
import { Button, Table, Space, Input, Modal } from "antd";
import AddMOM from "../forms/AddMOM";

function MeetingDetails(props) {
    
    const [meetingVisible, setmeetingVisible] = useState({modalVisible:false});
    const { modalVisible } = meetingVisible;
    const handleView = () => {
        setmeetingVisible({ ...meetingVisible, modalVisible: true })
    };
    return (
        <div>
            <Button type="primary" onClick={handleView}>View</Button>
            <Modal

                visible={modalVisible}
                onCancel={() => { setmeetingVisible({modalVisible:false}) }}
            >
                <h1>{props.meeting.name}</h1>
                <h4>Held at: {props.meeting.date}</h4>
                <h3>MOM:</h3>
                <h4>mom {props.meeting.mom}</h4>
                <h4>Attached Document <a href={props.meeting.pdf_link}>Click Here</a></h4>
                <AddMOM meeting={props.meeting} addMoM={props.addMoM}></AddMOM>

            </Modal>

        </div>
    )
}

export default MeetingDetails
