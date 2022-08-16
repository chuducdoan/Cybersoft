import axios from 'axios';
import {DOMAIN} from '../util/constants/settingSystem';

class ToDoListService {
    constructor() {

    }

    getTaskApi = () => {
        return axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }

    addTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/ToDoList/AddTask`,
            method: 'POST',
            data: {taskName: taskName}
        });
    }

    deleteTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
    }

    checkDoneTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
    }

    rejectTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
    }
}

const toDoListService = new ToDoListService();
export default toDoListService;