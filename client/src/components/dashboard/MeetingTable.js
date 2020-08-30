import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Table, Space, Input } from "antd";

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
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={(e) => onMOMButton(e, record)}>
            Add MOM
          </Button>
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
      filterTable: props.users.filter((o) =>
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
        dataSource={filterTable === null ? props.users : filterTable}
      >
        {" "}
      </Table>
    </>
  );
};
export default MeetingTable;
