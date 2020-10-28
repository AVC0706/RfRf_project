import React from 'react'
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
function MemberList(props) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.members}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#fcac44' }} icon={<UserOutlined />} />}
                        title={<Link to={`/userProfile/${item.id}`}>{item.name}</Link>}
                        al         description={"Located at "+item.city+","+item.state+". This member is a "+item.qualification}
                    />
                </List.Item>
            )}
        />
    )
}

export default MemberList
