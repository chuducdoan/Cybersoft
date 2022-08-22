import { call, delay, put, takeLatest, select } from 'redux-saga/effects';
import { USER_SIGNIN_API, USLOGIN } from './../../constants/Cyberbugs/CyberbugsConst';
import cyberbugsService from './../../../services/CyberbugsService';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import {push} from 'react-router-redux';

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