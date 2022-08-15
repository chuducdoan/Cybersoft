/*
redux co 2 loai action:
Loai 1: action => object (action thuong)
Loai 2: action => function (thuong dung de xu ly api hoac goi cac action khac)
*/
import {fork, take, takeEvery, delay, call, put} from 'redux-saga/effects';
import axios from 'axios';
import { GET_TASK_API } from '../constants/ToDoListConst';

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

    // su dung call
    let {data, status} = yield call(() => {
        return axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
    })
    // sau khi lay gia tri thanh cong
    // de dispatch len reducer ta dung put
    yield put({
        type: GET_TASK_API,
        taskList: data
    })
}

export function * rootSaga() {
    // cach 1 - cu:
    // yield fork(getTaskApi);

    // theo doi neu nguoi dung dispatch action ten la getTaskApiAction thi thuc thi generator function getTaskApi
    yield takeEvery('getTaskApiAction', getTaskApi);

}

