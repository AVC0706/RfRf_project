import { Button, Card, Col, Input, Row, Space, Table } from 'antd';
import React, { useState,useContext } from 'react'
import Modal from 'antd/lib/modal/Modal';
import AddPublication from '../../components/forms/AddPublication';
import UserContext from '../../context/user/userContext';
function Publications() {
    const userContext = useContext(UserContext);

    const baseColumns = [
        {
            title: 'Publication',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
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
    const [publication, setpublication] = useState(
        {
            searchText: '',
            searchedColumn: '',
        }
    )
    const [state, setState] = useState(
        {
            modalVisible: false,
            filterTable: null,
            columns: baseColumns,
            //baseData: props.mandals,
            searchText: "",
        }
    );
    const { modalVisible, baseData, filterTable, columns, searchText } = state;

    const search = (value) => {
        setState({
            ...state,
            searchText: value,
            filterTable: baseData.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(value.toLowerCase())
                )
            ),
        });
    };
    const showAddPublication = () => {
        setState({ modalVisible: true });
    };
    const onChange = (e) => {
        if (e.value === "") {
            setState({
                ...state, filterTable: null, //baseData: props.mandals
            });
        }
        setState({ ...state, searchText: e.value });
    };
    return (
        <div >
            <Row>
                <Col span={2} />
                <Col span={20}>
                    <Card title={<h1>Publications</h1>} extra={userContext.user && userContext.user.admin !== 'null' &&
                        <Button
                            onClick={showAddPublication}
                            type='primary'>
                            Add Publication</Button>
                    }>
                        <Modal visible={modalVisible} onCancel={() => { setState({ modalVisible: false }) }} footer={null}>
                            <AddPublication />
                        </Modal>
                        <Input.Search
                            placeholder="Search"
                            value={searchText}
                            onChange={onChange}
                            enterButton
                            onSearch={search}
                        />
                        <Table style={{ marginTop: '.5%' }} columns={columns} dataSource={filterTable == null ? baseData : filterTable} />
                    </Card>

                </Col>
                <Col span={2} />

            </Row>
        </div>
    )
}

export default Publications
