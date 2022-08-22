import { CLOSE_DRAWER, OPEN_DRAWER, SET_SUBMIT_EDIT } from './../constants/Cyberbugs/CyberbugsConst';

const initialState = {
    visible: false,
    ComponentContentDrawer: <p>default content</p>,
    callBackSubmit: (propsValue) => {alert('click demo')}
}

const DrawerCyberbugReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_DRAWER:
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            return {...state}
        case CLOSE_DRAWER:
            return {...state, visible: false}
        case SET_SUBMIT_EDIT: 
            state.callBackSubmit = action.callBackSubmit;
            return {...state};
        default:
            return state;
    }
}

export default DrawerCyberbugReducer;