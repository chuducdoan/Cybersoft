import { Layout, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import {withFormik, Formik} from 'formik';
import * as Yup from 'yup';
import { USER_SIGNIN_API } from '../../../redux/constants/Cyberbugs/CyberbugsConst';
import { useDispatch } from 'react-redux';
import { signinCyberbugAction } from '../../../redux/actions/CyberBugsAction';
import { useState, useEffect } from 'react';

const { Header, Footer, Sider, Content } = Layout;

function LoginCyberBugs({values, touched, errors, handleChange, handleBlur}) {

    const [{width, height}, setSize] = useState({width: window.innerWidth, height: window.innerHeight})
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signinCyberbugAction(values.email, values.password));
    }

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, []);
   
    return ( 
        <Layout>
            <Sider style={
                {height: height, 
                backgroundImage: 'url(https://picsum.photos/500)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
                }} width={width/2}>
            </Sider>
            <Content>
                <form onSubmit={(e) => handleSubmit(e)} className='container'>
                    <div style={{height: window.innerHeight}} className='d-flex justify-content-center align-items-center'>
                        <div>
                            <h3 className='text-center'>Sybersort login</h3>
                            <Input onChange={handleChange} name='email' size="large" placeholder="email" prefix={<UserOutlined />} />
                            <div className='text-danger'>{errors.email}</div>
                            <Input onChange={handleChange} name='password' className='mt-3' size="large" placeholder="password" prefix={<LockOutlined />} />
                            <div className='text-danger'>{errors.password}</div>
                            <Button htmlType="submit" size='large' 
                            style={{width: '100%', backgroundColor: 'rgb(102, 117, 223)', color: '#fff'}} className="mt-5">Login</Button>
                        </div>
                    </div>
                </form>
            </Content>
        </Layout>
     );
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    validate: values => {
        const errors = {};
        if(!values.name) {
            errors.name = 'Required';
        }
        return errors;
    },

   validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email invalid!'),
        password: Yup.string().required('Password is required').min(6, 'password must have min 6 character').max(32, 'password must have max 32 character')
   }),

    displayName: 'BasicForm'
})(LoginCyberBugs)

export default LoginCyberBugsWithFormik;