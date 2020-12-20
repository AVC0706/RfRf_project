import React, {useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Space, Table} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import MeetingDetails from "../profiles/MeetingDetails";
import AddMOM from "../forms/AddMOM";
import axios from "axios";
const MeetingTable = (props) => {
    const onDeleteButton = (e, text, record) => {
        e.preventDefault();
        console.log(record);
        props.deleteMeet(record._id, record.name);

        function onChange(pagination, filters, sorter, extra) {
            console.log("params", pagination, filters, sorter, extra);
        }
    };

    const baseColumns = [
        {
            title: "Meeting Name",
            dataIndex: "name",
            key: "name",
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                return a.name.localeCompare(b.name);
            },
            sortDirections: ["descend", "ascend", "descend"],
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Agenda",
            dataIndex: "agenda",
            key: "agenda",
            sorter: (a, b) => {
                return a.email.localeCompare(b.email);
            },
            sortDirections: ["descend", "ascend", "descend"],
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">

                    <MeetingDetails meeting={record}></MeetingDetails>
                    <AddMOM meeting={record} addMoM={props.addMom}></AddMOM>
                    <Popconfirm
                        title="Are you sure？"
                        icon={<QuestionCircleOutlined style={{color: "red"}}/>}
                        onConfirm={(e) => onDeleteButton(e, text, record)}
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const data = [];
    const [state, setstate] = useState({
        filterTable: null,
        columns: baseColumns,
        // props.users: props.users,
        searchText: "",
    });
    const {filterTable, columns, searchText} = state;
    const search = (value) => {
        setstate({
            ...state,
            searchText: value,
            filterTable: props.meetings.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(value.toLowerCase())
                )
            ),
        });
    };
    const onMOMButton = (e, record) => {
        e.preventDefault();
        // props.history.push('/userProfile')
    };

    const onChange = (e) => {
        // if (e.value === "") {
        //   setstate({ ...state, filterTable: null });
        // }
        setstate({...state, searchText: e.value});
    };
    return (
        <>
            <Input.Search
                placeholder="Search"
                value={searchText}
                onChange={onChange}
                enterButton
                onSearch={search}
            ></Input.Search>
            <Table
                columns={columns}
                dataSource={filterTable === null ? props.meetings : filterTable}
            >
                {" "}
            </Table>
        </>
    );
};
export default MeetingTable;
