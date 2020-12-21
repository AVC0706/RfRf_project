import React, { useState } from "react";
import moment from "moment";
import Dropzone from "react-dropzone";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios"
const { Option } = Select;
const { Dragger } = Upload;
export default function AddMOM(props) {
    const [addMOM, setAddMOM] = useState({
        addMOM_visible: false,
        tags: [],
        mom: "",
    });
    const [files, setFiles] = useState({
        name: "",
        file: null
    })
    const { addMOM_visible, mom, tags } = addMOM;
    const hideAddMOM = () => {
        setAddMOM({ ...addMOM, addMOM_visible: false });
    };
    const onChangeMOMTags = (e) => {
        setAddMOM({ ...addMOM, tags: e });
    };
    const formatFilename = filename => {
        const date = moment().format("YYYYMMDD");
        const randomString = Math.random()
            .toString(36)
            .substring(2, 7);
        const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFilename = `mom/${date}-${randomString}-${cleanFileName}`;
        return newFilename.substring(0, 60);
    };
    const onAddMOM = async () => {
        console.log(props.meeting._id)
        props.addMoM(props.meeting._id, addMOM);
        const { name, file } = files;
        const filename = formatFilename(file.name);
        const filetype = file.type;
        console.log(filename);
        console.log(filetype);
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const options = {
            headers: {
                "Content-Type": file.type
            }
        };
        const response = await axios.post(process.env.REACT_APP_SERVER_URL +`/document/uploadfile`,{filename,filetype},config);
        console.log(response);
        const { signedRequest, url } = response.data;
        await axios.put(signedRequest, file, options);
        console.log("not going down");
        const res = await axios.post( process.env.REACT_APP_SERVER_URL +`/document/addindb/${props.meeting._id}`, { signedRequest, url }, config);
        alert(res);
        setAddMOM({ ...addMOM, addMOM_visible: false });
    };
    const showAddMOM = () => {
        setAddMOM({ ...addMOM, addMOM_visible: true });
    };
    const onChange = (e) => {
        setAddMOM({ ...addMOM, [e.target.name]: e.target.value });
    };
    const onDrop = async (files) => {
        setFiles({ file: files[0] });
    };
    return (
        <>
            <Button type="primary" onClick={showAddMOM}>
                Add MOM

            </Button>


            <Modal
                title={"Add MOM"}
                visible={addMOM_visible}
                footer={null}
                onCancel={hideAddMOM}
            >
                <Form name="addMOM">
                    <Form.Item>
                        <Form.Item name="tags" label="MOM Tags">
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={onChangeMOMTags}
                            >
                                <Option key="tags">Put tag here</Option>
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="mom"
                            label="mom"

                        >
                            <Input name="mom" value={mom} onChange={onChange} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item><br></br>
                        <Dropzone onDrop={onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </Form.Item>
                    <br></br>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="register-form-button"
                        onClick={onAddMOM}
                    >
                        Add MOM
                    </Button>
                </Form>
            </Modal>
        </>
    )
}
