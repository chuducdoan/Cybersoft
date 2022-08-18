import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from 'antd';
import React from 'react';

const { Header, Footer, Sider, Content } = Layout;

function Login() {

    const [userLogin, setUserLogin] = useState({userName: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserLogin(user => ({...user, [name]: value}));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if(userLogin.userName === 'admin' && userLogin.password === 'admin') {
            navigate(-1);
            localStorage.setItem('userLogin', JSON.stringify(userLogin));
        } else {
            alert('Login fail!');
            return;
        }
    }

    return ( 
        <>
            <Layout>
                <Sider style={
                    {height: window.innerHeight, 
                    backgroundImage: 'url(https://picsum.photos/500)',
                    }} width={window.innerWidth/2}>
                    abc
                </Sider>
                <Content>
                    <form className="container" onSubmit={handleLogin}>
                        <Button type="primary">testr</Button>
                        <h3 className="display-4">Login</h3>
                        <div className="form-group">
                            <p>Username</p>
                            <input name="userName" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <p>Password</p>
                            <input name="password" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">Dang nhap</button>
                        </div>
                    </form>
                </Content>
            </Layout>
        </>
    );
}

export default Login;