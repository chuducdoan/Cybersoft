/*
redux co 2 loai action:
Loai 1: action => object (action thuong)
Loai 2: action => function (thuong dung de xu ly api hoac goi cac action khac)
*/
import { all } from 'redux-saga/effects';
import * as ToDoListSaga from './ToDoListSaga';

export function * rootSaga() {
    // cach 1 - cu:
    // yield fork(getTaskApi);

    // theo doi neu nguoi dung dispatch action ten la getTaskApiAction thi thuc thi generator function getTaskApi
    // yield takeEvery('getTaskApiAction', getTaskApi);


    yield all([
        // nghiep vu theo doi cac action Saga todolist
        ToDoListSaga.theoDoiActionGetTaskAPI(),
        ToDoListSaga.theoDoiActionAddTaskApi(),
        ToDoListSaga.theoDoiActionDeleteTaskApi(),
        ToDoListSaga.theodoiActionCheckDoneTaskApi(),
        ToDoListSaga.theoDoiActionRejectTaskApi()
    ])

}

