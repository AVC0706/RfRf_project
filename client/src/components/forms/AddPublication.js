import React, {useState} from 'react';
import {Button, Form, Input} from "antd";

function AddPublication(props) {
    const [Publication, setPublication] = useState({
        name: "",
        author: "",
    });
    const {name, author} = Publication;
    const onChange = (e) => {
        setPublication({...Publication, [e.target.name]: e.target.value});
    };
    const onAddPublication = () => {
        //Add Publication Code

    }
    return (
        <div>
            <br></br>
            <Form name="addPublication" onFinish={onAddPublication}>
                <Form.Item
                    name="name"
                    label="Publication Name"
                    rules={[{
                        required: true, message: "Please input a Publication name!",
                    }]}
                >
                    <Input name="name" value={name} onChange={onChange}></Input>
                </Form.Item>
                <Form.Item
                    name="Author"
                    label="author"
                    rules={[{
                        required: true, message: "Please input Author!",
                    }]}>
                    <Input name="author" value={author} onChange={onChange}></Input>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                >
                    Add Publication
                </Button>
            </Form>
        </div>
    )
}

export default AddPublication
