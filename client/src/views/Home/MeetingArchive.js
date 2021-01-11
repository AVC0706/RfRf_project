import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Input, Row, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";

function MeetingArchive() {
    const [state, setState] = useState(
        {
            filterTable: null,
            searchText: "",
        }
    );
    const getarchive = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + `/meeting/getAllMeetings`)
            .then((res) => {
                if (res.status === 200) {
                    setarchive(res.data)
                }
            }).catch(e => {
                console.log(e.message);
            })
    }
    useEffect(() => {
        getarchive()
    }, [])
    const search = (value) => {
        setState({
            ...state,
            searchText: value,
            filterTable: archive.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(value.toLowerCase())
                )
            ),
        });
    };
    const onChange = (e) => {
        if (e.value === "") {
            setState({
                ...state, filterTable: null, //baseData: props.mandals
            });
        }
        setState({ ...state, searchText: e.value });
    };
    const { filterTable, searchText } = state;
    const [archive, setarchive] = useState([])
    const columns = [
        {
            title: 'Meeting Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Agenda',
            dataIndex: 'agenda',
            key: 'agenda',
        },
        {
            title: "Actions",
            key: 'actions',
            render: () => (
                <Space size="middle">
                    <Button type="primary">View</Button>
                </Space>
            )
        }
    ];
    return (
        <div>
            <Row>
                <Col span={2} />
                <Col span={20}>
                    <Card title={<h1>Meeting Archive</h1>} extra={<Input.Search
                            placeholder="Search"
                            value={searchText}
                            onChange={onChange}
                            enterButton
                            onSearch={search}
                        />}>
                        
                        <Table columns={columns} dataSource={filterTable == null ? archive : filterTable} />
                    </Card>
                </Col>
                <Col span={2} />

            </Row>

        </div>
    )
}

export default MeetingArchive
