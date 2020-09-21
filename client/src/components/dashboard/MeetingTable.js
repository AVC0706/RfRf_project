import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Table, Space, Input,Modal } from "antd";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";

const MeetingTable = (props) => {
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
          <Button type="primary">
            Add MOM
          </Button>
          <Modal
                      title={props.meetings.name}
                      visible={true}
                      footer={null}
                    ></Modal>
          <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            // onConfirm={(e) => onDeleteButton(e, text, record)}
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
  const { filterTable, columns, searchText } = state;
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
    setstate({ ...state, searchText: e.value });
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
