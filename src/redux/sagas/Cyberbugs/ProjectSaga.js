import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import cyberbugsService from '../../../services/CyberbugsService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';

function * createProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const {data, status} = yield call(() => cyberbugsService.createProjectAuthorization(action.payload));
       if (status === STATUS_CODE.SUCCESS) {
            let navigate = yield select(state => state.HistoryReducer.navigate);
            navigate('/projectmanagement');
       }
    } catch(err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

// Saga dung de get all project tu api
// DoanCD - Cdoe ngay 21/8/2022
function * getAllProjectSaga() {
    try {
        const {data, status} = yield call(() => cyberbugsService.getAllProject());
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_ALL_PROJECT',
                payload: data.content
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function * theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

// Saga dung de update project tu api
// DoanCD = Code ngay 22/08/2022
function * updateProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    }) 
    try {
        const {data, status} = yield call(() => cyberbugsService.updateProject(action.projectUpdate));
        if(status === STATUS_CODE.SUCCESS) {
            
        }   
    } catch(error) {
        console.log(error)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

