import React, { useState } from 'react';
import { Form, Input, Button ,Select} from "antd";
const {Option} = Select;
function AddMeeting(props) {
    const [meeting, setmeeting] = useState({
        name: "",
        agenda: "",
        tags: []
    });
    const { name, agenda} = meeting;
    const onChange = (e) => {
        setmeeting({ ...meeting, [e.target.name]: e.target.value });
    };
    
    const onAddMeeting = () => {
        props.addMeeting(meeting);
    }
    return (
        <div>
            <Form name="addMeeting">
                <Form.Item
                    name="name"
                    label="Meeting Name"
                    rules={[{
                        required: true, message: "Please input meeting name",
                    }]}
                >
                    <Input name="name" value={name} onChange={onChange}></Input>
                </Form.Item>
                <Form.Item
                    name="agenda"
                    label="Agenda"
                    rules={[{
                        required: true, message: "Please input agenda",
                    }]}>
                    <Input name="agenda" value={agenda} onChange={onChange}></Input>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                    onClick={onAddMeeting}
                >
                    Add Meeting
          </Button>
            </Form>
        </div>
    )
}

export default AddMeeting
