import { GET_TASK_API } from './../constants/ToDoListConst';
import axios from 'axios';

export const getTaskListApi = () => {
    // Tien xu ly du lieu => xu ly function
    return async dispatch => {
        try {
            const {data, status} = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
            } 
        } catch (err) {
            console.log(err.response.data);
        }  
    }
}

export const addTaskApi = (taskName) => {
    return async dispatch => {
        try {
            const {data, status} = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: {taskName: taskName}
            });
            if (status === 200) {
                dispatch(getTaskListApi());
            }
        } catch (err) {
            console.log(err.response.data);
        }
    }
}

export const delTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi());
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }
}

export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi());
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }
}

export const rejectTaskApi = (taskName) => {
    return dispatch => {
        const promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi());
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }
}
