import React, { useState } from 'react';
import { Form, Input, Button ,Select} from "antd";
const {Option} = Select;
function AddMeeting(props) {
    const [meeting, setmeeting] = useState({
        name: "",
        agenda: "",
        tags: []
    });
    const { name, agenda, tags } = meeting;
    const onChange = (e) => {
        setmeeting({ ...meeting, [e.target.name]: e.target.value });
    };
    const onChangeMOMTags = (e) => {
        setmeeting({ ...meeting, tags: e });
    }
    const onFinish = () => {
        props.addMeeting();
    }
    return (
        <div>
            <Form name="addMeeting" onFinish={onFinish}>
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
                <Form.Item>
                    <Form.Item label="MOM Tags">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={onChangeMOMTags}
                        >
                            <Option key = "example">Put tag here</Option>
                                                         </Select>
                    </Form.Item>
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
