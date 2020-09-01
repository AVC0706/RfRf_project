import React,{useState} from 'react';
import { Form, Input,Button } from "antd";
function AddMeeting(props) {
    const [meeting, setmeeting] = useState({
        name: "",
        agenda: "",
    });
    const { name, agenda } = meeting;
    const onChange = (e) => { 
        setmeeting({ ...meeting, [e.target.name]: e.target.value });
    };
    const onFinish = () =>
    {
        props.addMeeting();
    }
    return (
        <div>
            <Form name = "addMeeting" onFinish = {onFinish}>
                <Form.Item
                    name="name"
                    label="Meeting Name"
                    rules={[{
                        required: true, message: "Please input meeting name",
                    }]}
                    >
                    <Input name="name_input" value={name} onChange={onChange}></Input>
                </Form.Item>
                <Form.Item
                    name="agenda"
                    label="Agenda"
                    rules={[{
                        required: true, message: "Please input agenda",
                    }]}>
                    <Input name="agenda_input" value={agenda} onChange={onChange}></Input>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                >
                    Add Meeting
          </Button>
            </Form>
        </div>
    )
}

export default AddMeeting
