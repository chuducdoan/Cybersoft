import { Layout, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';

const { Header, Footer, Sider, Content } = Layout;

function LoginCyberBugs() {
    return ( 
        <Layout>
            <Sider style={
                {height: window.innerHeight, 
                backgroundImage: 'url(https://picsum.photos/500)',
                }} width={window.innerWidth/2}>
            </Sider>
            <Content>
                <div className='container'>
                    <div style={{height: window.innerHeight}} className='d-flex justify-content-center align-items-center'>
                        <div>
                            <h3 className='text-center'>Login CyberBugs</h3>
                            <Input name='email' size="large" placeholder="email" prefix={<UserOutlined />} />
                            <Input name='password' className='mt-3' size="large" placeholder="password" prefix={<LockOutlined />} />
                            <Button size='large' 
                            style={{width: '100%', backgroundColor: 'rgb(102, 117, 223)', color: '#fff'}} className="mt-5">Login</Button>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
     );
}

export default LoginCyberBugs;