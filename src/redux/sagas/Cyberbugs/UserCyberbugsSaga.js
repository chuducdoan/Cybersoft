import { call, delay, put, takeLatest, select } from 'redux-saga/effects';
import { GET_USER_SAGA, GET_USER_SEARCH, USER_SIGNIN_API, USLOGIN } from './../../constants/Cyberbugs/CyberbugsConst';
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