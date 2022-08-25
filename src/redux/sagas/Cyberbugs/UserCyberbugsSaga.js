import { call, delay, put, takeLatest, select } from 'redux-saga/effects';
import { ASSIGN_USER_PROJECT_SAGA, DELETE_USER_FROM_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, GET_USER_SAGA, GET_USER_SEARCH, USER_SIGNIN_API, USLOGIN } from './../../constants/Cyberbugs/CyberbugsConst';
import cyberbugsService from './../../../services/CyberbugsService';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import userService from './../../../services/UserService';
import { STATUS_CODE } from './../../../util/constants/settingSystem';

// Quan ly cac action saga
function * signinSaga(action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    // Goi api
    try {
        const {data, status} = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin));
        console.log(data)
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
        yield put({
            type: USLOGIN,
            userLogin: data.content
        })
        
        let historyReducer = yield select(state => state.HistoryReducer.navigate);
        historyReducer('/home');
    } catch(err) {
        console.log(err.response.data);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}

// Saga lay user tu api
// DoanCD - code ngay 22/8/2022
function * getUserSaga(action) {
    try {
        const {data, status} = yield call(() => userService.getUser(action.keyword));
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_SEARCH,
                lstUserSearch: data.content
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiGetUserSaga() {
    yield takeLatest(GET_USER_SAGA, getUserSaga);
}

//  Saga them user vao project tu api
//  DoanCD - Code ngay 23/8/2022
function * assignUserProjectSaga(action) {
    try {
        const {data, status} = yield call(() => userService.assignUserProject(action.userProject));
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiAssignUserProjectSaga() {
    yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

//  Saga user khoi project tu api
//  DoanCD - Code ngay 23/8/2022
function * deleteUserFromProjectSaga(action) {
    try {
        const {data, status} = yield call(() => cyberbugsService.deleteUserFromProject(action.userProject));
        if(status === STATUS_CODE.SUCCESS) {
            console.log(data)
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiDeleteUserFromProjectSaga() {
    yield takeLatest(DELETE_USER_FROM_PROJECT_SAGA, deleteUserFromProjectSaga);
}

