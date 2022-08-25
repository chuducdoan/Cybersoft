import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA, GET_ALL_PROJECT_SAGA, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA, UPDATE_PROJECT_SAGA } from '../../constants/Cyberbugs/CyberbugsConst';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';
import { openNotificationWithIcon } from './../../../util/Notification/NotificationCyberbugs';
import cyberbugsService from './../../../services/CyberbugsService';

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

// Saga dung de xoa project tu api
// DoanCD = Code ngay 22/08/2022
function * deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const {data, status} = yield call(() => cyberbugsService.deleteProject(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            openNotificationWithIcon('success', 'Delete project successfuly!');
        } else {
            openNotificationWithIcon('error', 'Delete project fail!');
        } 
        yield put({
            type: GET_ALL_PROJECT_SAGA
        })
    } catch(err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

// Saga dung de lay detail project theo id tu api
// DoanCD = Code ngay 23/08/2022
function * getProjectDetailSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const {data, status} = yield call(() => cyberbugsService.getProjectDetail(action.projectId));
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                projectDetail: data.content
            })
        }
    } catch(err) {
        console.log(err);
        let navigate = yield select(state => state.HistoryReducer.navigate);
        navigate('/projectmanagement');
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiGetProjectDetailSaga() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

// Saga dung de lay all task type tu api
// DoanCD = Code ngay 24/08/2022
function * getAllTaskTypeSaga() {
    try {
        const {data, status} = yield call(() => cyberbugsService.getAllTaskType());
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_TYPE,
                arrTaskType: data.content
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}

// Saga dung de lay all priority tu api
// DoanCD = Code ngay 24/08/2022
function * getAllPrioritySaga() {
    try {
        const {data, status} = yield call(() => cyberbugsService.getAllPriority());
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRIORITY,
                arrPriority: data.content
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}