import React, {useState,useEffect} from 'react';
import {Button, Card, Col, Input, Row, Space, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import axios from "axios";

function MeetingArchive() {
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
                <Col span={2}/>
                <Col span={20}>
                    <Card title={<h1>Meeting Archive</h1>}>
                        <Table columns={columns} dataSource={archive}/>
                    </Card>
                </Col>
                <Col span={2}/>

            </Row>

        </div>
    )
}

export default MeetingArchive
