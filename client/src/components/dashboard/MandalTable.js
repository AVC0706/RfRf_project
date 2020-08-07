import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Table, Space, Input } from "antd";
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';


const MandalTable = (props) => {
  console.log(props.users);
  const baseColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: 'descend',
      sorter: (a, b) =>{ return a.name.localeCompare(b.name)},
      sortDirections: ['descend', 'ascend', 'descend'],
      render: text => <a>{text}</a>
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      sorter: (a, b) =>{ return a.admin.localeCompare(b.admin)},
      sortDirections: ['descend', 'ascend', 'descend'],
      render: text => <a>{text}</a>
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sorter: (a, b) =>{ return a.state.localeCompare(b.state)},
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      sorter: (a, b) => { return a.district.localeCompare(b.district)},
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => { return a.city.localeCompare(b.city)},
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
    searchText:"",
  });
  const { baseData, filterTable, columns ,searchText} = state;
  const search = value => {
    setstate({ ...state, searchText: value,filterTable: baseData.filter(o =>
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

  };
  const onChange = e =>
  {
    if(e.value === "")
    {
      setstate({...state,filterTable:null,baseData:rawData});
    }
    setstate({...state,searchText:e.value});
  };
  return (
    <>
      <Input.Search placeholder="Search" value={searchText} onChange = {onChange} enterButton onSearch={search}></Input.Search>
      <Table columns={columns} dataSource={filterTable == null ? baseData : filterTable}> </Table>
    </>

  )
}
export default MandalTable
