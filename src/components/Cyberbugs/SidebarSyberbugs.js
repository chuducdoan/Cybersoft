import {
    PlusOutlined, SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { OPEN_DRAWER } from '../../redux/constants/Cyberbugs/CyberbugsConst';
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
}

function SidebarSyberbugs() {
    const [collapsed, setCollapsed] = useState(true);
    const dispatch = useDispatch();

    return ( 
        <div>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{height: '100%'}}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => {
                        dispatch({
                            type: OPEN_DRAWER,
                            Component: <FormCreateTask/>,
                            title: 'Create new task'
                        })
                    }}>
                        <span className='mb-2'>Create task</span>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined />}>
                        Search
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
     );
}

export default SidebarSyberbugs;