import React from 'react'
import 'antd/dist/antd.css';
import {Button ,Table,Space} from "antd";
function DataTable(props) {
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
            render: () => (
                <Space size="middle">
                    <Button type = "primary">Update</Button>
                    <Button type = "primary" danger>Delete</Button>
                </Space>
            )
        }
    ];
    return (
        <><Table columns = {coloumns} dataSource = {props.users}></Table></>
        
    )
}

export default DataTable
