import React from 'react'
import 'antd/dist/antd.css';
import {Button ,Table,Space} from "antd";
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


const DataTable = (props) => {

    const onClick = ( e , text , record ) => {
        // e.preventDefault();
        console.log( record )
        props.deleteUser( record._id , record.admin)
    }

    const data = [];
    const coloumns = [
        {
            title: "Name",
            dataIndex:"name",
            key:"name",
            render: text => <a>{text}</a>
        },
        {
            title: "Admin",
            dataIndex:"admin",
            key:"admin",
            render: text => <a>{text}</a>
        },
        {
            title: "State",
            dataIndex:"state",
            key:"state",
        },
        {
            title: "District",
            dataIndex:"district",
            key:"district",
        },
        {
            title: "City",
            dataIndex:"city",
            key:"city",
        },
        {
            title: "Actions",
            key:"actions",
            render: (text , record) => (
                <Space size="middle">
                    <Button type = "primary">View</Button>

                    <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}  onConfirm={(e)=> onClick(e , text , record) }>
                        <Button type = "primary" danger >Delete</Button>
                    </Popconfirm>

                </Space>
            )
        }
    ];
    return (
        <><Table columns = {coloumns} dataSource = {props.users}></Table></>
        
    )
}

export default DataTable
