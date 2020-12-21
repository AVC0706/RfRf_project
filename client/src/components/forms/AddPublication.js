import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import Dropzone from "react-dropzone";
import moment from "moment";
import axios from "axios"
function AddPublication(props) {
    const [Publication, setPublication] = useState({
        file: null
    });
    const [pub,setPub] = useState({
        name:"",
        author:""
    })
    const {name, author} = pub;
    const onChange = (e) => {
        setPub({...pub, [e.target.name]: e.target.value});
    };
    const formatFilename = filename => {
        const date = moment().format("YYYYMMDD");
        const randomString = Math.random()
            .toString(36)
            .substring(2, 7);
        const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFilename = `publication/${date}-${randomString}-${cleanFileName}`;
        return newFilename.substring(0, 60);
    };
    const onAddPublication = async () => {
        const {  file } = Publication;
        const {name, author} = pub;
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
        const response = await axios.post(process.env.REACT_APP_SERVER_URL+`/document/uploadfile`,{filename,filetype},config);
        console.log(response);
        const { signedRequest, url } = response.data;
        await axios.put(signedRequest, file, options);
        console.log("not going down");
        console.log(name,author)
        const res = await axios.post( process.env.REACT_APP_SERVER_URL +`/document/addindbpub`, { name,author,signedRequest, url }, config);
        alert(res);
    };

    const onDrop = async (files) => {
        setPublication({ file: files[0] });
    };
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
                <Form.Item>
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
