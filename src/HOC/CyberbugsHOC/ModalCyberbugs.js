import { Button, Drawer, Select, Space } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER } from '../../redux/constants/Cyberbugs/CyberbugsConst';
const { Option } = Select;

function ModalCyberbugs() {

    const dispatch = useDispatch();

    const {visible, ComponentContentDrawer, callBackSubmit, title} = useSelector(state => state.DrawerCyberbugReducer);

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER
        })
    }

    return ( 
        <>
      <Drawer
        title={title}
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