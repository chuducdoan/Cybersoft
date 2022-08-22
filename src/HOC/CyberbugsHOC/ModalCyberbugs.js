import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_DRAWER } from '../../redux/constants/Cyberbugs/CyberbugsConst';
const { Option } = Select;

function ModalCyberbugs() {

    const dispatch = useDispatch();

    const {visible, ComponentContentDrawer, callBackSubmit} = useSelector(state => state.DrawerCyberbugReducer);

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER
        })
    }

    return ( 
        <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
     );
}

export default ModalCyberbugs;