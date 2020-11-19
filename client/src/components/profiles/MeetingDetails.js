import React, {useState} from 'react'
import {Button, Modal} from "antd";


function MeetingDetails(props) {

    const [meetingVisible, setmeetingVisible] = useState({modalVisible: false});
    const {modalVisible} = meetingVisible;
    const handleView = () => {
        setmeetingVisible({...meetingVisible, modalVisible: true})
    };
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
                <hr></hr>
                <h4>Held at: {props.meeting.date}</h4>
                <h3>MOM:</h3>
                <h4>mom {props.meeting.mom}</h4>
                <h4>Attached Document <a href={props.meeting.pdf_link}>Click Here</a></h4>


            </Modal>

        </div>
    )
}

export default MeetingDetails
