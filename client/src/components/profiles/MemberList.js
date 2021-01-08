import React from 'react'
import {Avatar, List} from 'antd';
import {UserOutlined} from '@ant-design/icons';

function MemberList(props) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.members}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{backgroundColor: '#fcac44'}} icon={<UserOutlined/>}/>}
                        title={item.name}
                        al
                        description={"Located at " + item.city + "," + item.state + ". This member is a " + item.qualification}
                    />
                </List.Item>
            )}
        />
    )
}

export default MemberList
