import { call, delay, put, takeLatest } from 'redux-saga/effects';
import toDoListService from '../../services/ToDoListService';
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../constants/ToDoListConst';
import {DISPLAY_LOADING, HIDE_LOADING} from '../constants/LoadingConst';

/*
    16/08/2022 DoanCD viet chuc nang getTask 
    Action saga lay danh sach task tu api
*/
function * getTaskApi(action) {
    // Cach 1 - cu:
    // while(true) {
    //     yield take('getTaskApiAction') // theo doi action => xem action nao dispatch moi lam cac cong viec ben duoi
    //     console.log('getTaskApi')
    //     // call api dispacth le reducers...
    // }  
    
    // su dung delay
    // yield delay(3000);
    // console.log('getTaskAPI', action);
    yield put({
        type: DISPLAY_LOADING
    })
    try {

        // su dung call
        let {data, status} = yield call(toDoListService.getTaskApi)
        yield delay(800);

        if (status === STATUS_CODE.SUCCESS) {
            // sau khi lay gia tri thanh cong
            // de dispatch len reducer ta dung put
            yield put({
                type: GET_TASK_API,
                taskList: data
            })
        } else {
            console.log('error');
        }
    } catch (err) {
        console.log('error', err);
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiActionGetTaskAPI() {
    yield takeLatest(GET_TASKLIST_API, getTaskApi);
}

/*
    16/08/2022 DoanCD viet chuc nang addTask 
    Action saga them task tu api
*/
function * addTaskApiAction (action) {
    const {taskName} = action;
    // Goi API
    try {
        const {status} = yield call(() => toDoListService.addTaskApi(taskName));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch (err) {
        console.log(err);
    }
    // Hien thi loading
    // thanh cong thi load lai task = cach goi lai action saga load tasklist
}

export function * theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

/*
    16/08/2022 DoanCD viet chuc nang deleteTask 
    Action saga thuc hien nghiep vu xoa task tu api
*/
function * deleteTaskApi(action) {
    const {taskName} = action;
    try {
        const {status} = yield call(() => toDoListService.deleteTaskApi(taskName));
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApi);
}

/*
    16/08/2022 DoanCD viet chuc nang checkDoneTask 
    Action saga thuc hien nghiep vu done task tu api
*/
function * checkDoneTaskApi(action) {
    const {taskName} = action;
    try {
        const {status} = yield call(() => toDoListService.checkDoneTaskApi(taskName));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theodoiActionCheckDoneTaskApi() {
    yield takeLatest(CHECK_TASK_API, checkDoneTaskApi);
}

/*
    16/08/2022 DoanCD viet chuc nang rejectTask 
    Action saga thuc hien nghiep vu reject task tu api
*/
function * rejectTaskApi(action) {
    const {taskName} = action;
    try {
        const {status} = yield call(() => toDoListService.rejectTaskApi(taskName));
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiActionRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API, rejectTaskApi);
}