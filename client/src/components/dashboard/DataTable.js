import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Table, Space, Input } from "antd";
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';


const DataTable = (props) => {
  console.log(props.users);
  const baseColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.length - b.name.length,
      render: text => <a>{text}</a>
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      render: text => <a>{text}</a>
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sorter: (a, b) => a.state.length - b.state.length,
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      sorter: (a, b) => a.district.length - b.district.length,
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.length - b.city.length,
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">View</Button>

          <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={(e) => onClick(e, text, record)}>
            <Button type="primary" danger >Delete</Button>
          </Popconfirm>

        </Space>
      )
    }
  ];
  const data = [];
  const rawData = props.users;
  const [state, setstate] = useState({
    filterTable: null,
    columns: baseColumns,
    baseData: rawData,
  });
  const { baseData, filterTable, columns } = state;
  const search = value => {
    setstate({ ...state, filterTable: baseData.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())))});
  };
  const onClick = (e, text, record) => {
    // e.preventDefault();
    console.log(record)
    props.deleteUser(record._id, record.admin)

    function onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }

  }
  return (
    <>
      <Input.Search placeholder="Search" enterButton onSearch={search}></Input.Search>
      <Table columns={columns} dataSource={filterTable == null ? baseData : filterTable}> </Table>
    </>

  )
}
export default DataTable
