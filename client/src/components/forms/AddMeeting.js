import React, {useState} from 'react';
import {Button, DatePicker, Form, Input} from "antd";

function AddMeeting(props) {
    const [meeting, setmeeting] = useState({
        name: "",
        agenda: "",
        date: null,
    });
    const {name, agenda, date} = meeting;
    const onChange = (e) => {
        setmeeting({...meeting, [e.target.name]: e.target.value});
    };
    const onChangeDate = (date) => {
        setmeeting({...meeting, date: date});
    };
    const onAddMeeting = () => {
        props.addMeeting(meeting);

    }
    return (
        <div>
            <Form name="addMeeting" onFinish={onAddMeeting}>
                <Form.Item
                    name="name"
                    label="Meeting Name"
                    rules={[{
                        required: true, message: "Please input a meeting name!",
                    }]}
                >
                    <Input name="name" value={name} onChange={onChange}></Input>
                </Form.Item>
                <Form.Item
                    name="agenda"
                    label="Agenda"
                    rules={[{
                        required: true, message: "Please input Agenda!",
                    }]}>
                    <Input name="agenda" value={agenda} onChange={onChange}></Input>
                </Form.Item>
                <Form.Item name="Date"
                           label="Date"
                           rules={[{
                            required: true, message: "Please input Date!",
                        }]}>
                    <DatePicker name="date" value={date} onChange={onChangeDate}/>
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
