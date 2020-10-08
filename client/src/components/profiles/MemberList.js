import React from 'react'
import { List, Avatar } from 'antd';
function MemberList() {
    const data = [
        {
            title: 'Member 1',
        },
        {
            title: 'Member 2',
        },
        {
            title: 'Member 3',
        },
        {
            title: 'Member 4!p ',
        },
    ];
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    )
}

export default MemberList
