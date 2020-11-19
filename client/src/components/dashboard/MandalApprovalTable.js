import React, {useContext, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Space, Table} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import UserContext from "../../context/user/userContext";
import {useHistory} from 'react-router-dom';


const MandalApprovalTable = (props) => {

    const [mandals, setMandals] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const userContext = useContext(UserContext);
    const {user} = userContext;
    const onClickView = (record) => {
        history.push(`/mandalProfile/${record._id}`);
    }
    const baseColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                try {
                    return a.name.localeCompare(b.name);
                } catch {

                }
            },
            sortDirections: ["descend", "ascend", "descend"],
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Admin",
            dataIndex: "admin",
            key: "admin",
            sorter: (a, b) => {
                if (a.name !== null) {
                    return a.admin.localeCompare(b.admin);
                }

            },
            sortDirections: ["descend", "ascend", "descend"],
            render: (text) => <a>{text}</a>,
        },

        {
            title: "District",
            dataIndex: "district",
            key: "district",
            sorter: (a, b) => {
                return a.district.localeCompare(b.district);
            },
            sortDirections: ["descend", "ascend", "descend"],
        },

        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onClickView(record)}>View</Button>
                    <Popconfirm
                        title="Are you sure you want to approve this mandal？"
                        icon={<QuestionCircleOutlined style={{color: "red"}}/>}
                        // onConfirm={props.approveMandal(record)}
                    >
                        <Button type="primary" style={{color: "white", backgroundColor: "#38BC3D"}}>
                            Accept
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Are you sure you want to reject this mandal？"
                        icon={<QuestionCircleOutlined style={{color: "red"}}/>}
                        // onConfirm={(e) => onClick(e, text, record)}
                    >
                        <Button type="primary" danger>
                            Reject
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
        baseData: props.mandals,
        searchText: "",
    });
    const {baseData, filterTable, columns, searchText} = state;
    const search = (value) => {
        setstate({
            ...state,
            searchText: value,
            filterTable: baseData.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(value.toLowerCase())
                )
            ),
        });
    };
    const onClick = (e, text, record) => {
        // e.preventDefault();
        console.log(record);

        // props.deleteUser(record._id, record.admin);

        function onChange(pagination, filters, sorter, extra) {
            console.log("params", pagination, filters, sorter, extra);
        }
    };
    const onChange = (e) => {
        if (e.value === "") {
            setstate({...state, filterTable: null, baseData: props.mandals});
        }
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
                dataSource={filterTable == null ? props.mandals : filterTable}
            >
                {" "}
            </Table>
        </>
    );
};
export default MandalApprovalTable;
