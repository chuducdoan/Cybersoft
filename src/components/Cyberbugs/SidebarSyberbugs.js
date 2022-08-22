import {
    PlusOutlined, SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
}

const items = [
    getItem('Create issue', '1', <PlusOutlined />),
    getItem('Search', '2', <SearchOutlined />),
];

function SidebarSyberbugs() {
    const [collapsed, setCollapsed] = useState(true);

    return ( 
        <div>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{height: '100%'}}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
        </div>
     );
}

export default SidebarSyberbugs;