import React, { useState, useEffect, useContext } from "react";
import { Form, Select, Upload, Button, message, Input, Descriptions, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const {Option} = Select;
const { Dragger } = Upload;
export default function AddMOM() {
    const [addMOM,setAddMOM] = useState({
        addMOM_visible : false,
    tags:[],
    text:"",
    });
    const {addMOM_visible,tags,text} = addMOM;
    const hideAddMOM = () =>
    {
        setAddMOM({...addMOM,addMOM_visible:false});
    };
    const onChangeMOMTags = (e) => {
        setAddMOM({ ...addMOM, tags: e });
    };
    const onAddMOM = (e) =>
    {
        setAddMOM({...addMOM,addMOM_visible:false});
    };
    const showAddMOM = () =>
    {
        setAddMOM({...addMOM,addMOM_visible:true});
    };
    const onChange = (e) => {
      setAddMOM({ ...addMOM, [e.target.name]: e.target.value });
  };
    const uploader = {
        name: "file",
        multiple: true,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange(info) {
          const { status } = info.file;
          if (status !== "uploading") {
            console.log(info.file, info.fileList);
          }
          if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
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
                    <Form.Item label="MOM Tags">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={onChangeMOMTags}
                        >
                            <Option key = "tags">Put tag here</Option>
                                                         </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                <Form.Item
            name="Text"
          >
            <Input name="text" value={text} onChange={onChange} />
          </Form.Item>
                </Form.Item>
                <Form.Item><br></br>
          <Dragger {...uploader}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger></Form.Item>
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
