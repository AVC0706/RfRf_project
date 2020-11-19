import React, {useState} from 'react';
import {Button, Col, Input, Row, Space, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

function MeetingArchive() {
    const [archive, setarchive] = useState(
        {
            searchText: '',
            searchedColumn: '',
        }
    )
    const {searchText, searchedColumn} = archive;
    const data = [];
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <></>
            ) : (
                text
            ),
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setarchive({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setarchive({searchText: ''});
    };
    const columns = [
        {
            title: 'Meeting Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Mandal',
            dataIndex: 'mandal',
            key: 'mandal',
            width: '20%',
            ...getColumnSearchProps('mandal'),
        },
        {
            title: 'Agenda',
            dataIndex: 'agenda',
            key: 'agenda',
            ...getColumnSearchProps('agenda'),
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            ...getColumnSearchProps('city'),
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
            ...getColumnSearchProps('district'),
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
                    <Table columns={columns} dataSource={data}/>
                </Col>
                <Col span={2}/>

            </Row>

        </div>
    )
}

export default MeetingArchive
