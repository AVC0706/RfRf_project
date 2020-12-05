import React, {useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Space, Table} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";

const MandalTable = (props) => {
    console.log(props.mandals);
    const baseColumns = [
        {
            title: "Name",
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
            title: "Admin",
            dataIndex: "admin",
            key: "admin",
            sorter: (a, b) => {
                return a.admin.localeCompare(b.admin);
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
                    <Button type="primary" onClick={(e) => onViewButton(e, record)}>
                        View
                    </Button>
                    <Popconfirm
                        title="Are you sure？"
                        icon={<QuestionCircleOutlined style={{color: "red"}}/>}
                        // onConfirm={(e) => onClick(e, text, record)}
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
    const rawData = props.mandals;
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
        props.deleteUser(record._id, record.admin);

        function onChange(pagination, filters, sorter, extra) {
            console.log("params", pagination, filters, sorter, extra);
        }
    };
    const onViewButton = (e, record) => {
        e.preventDefault();
        props.redirect(record._id)
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
            />
            <Table
                columns={columns}
                dataSource={filterTable == null ? baseData : filterTable}
            >
                {" "}
            </Table>
        </>
    );
};
export default MandalTable;
