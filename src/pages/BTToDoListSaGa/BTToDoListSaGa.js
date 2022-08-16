import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, REJECT_TASK_API } from '../../redux/constants/ToDoListConst';
import './BTToDoListSaGa.css';

function BaiTapToDoListSaGa() {
    const {taskList} = useSelector(state => state.ToDoListReducer);
    const dispatch = useDispatch();

    const [values, setValues] = useState({taskName: ''});
    const [errors, setErrors] = useState({taskName: ''});

    const getTaskList = () => {
        dispatch({
            type: GET_TASKLIST_API
        });
    }

    useEffect(() => {
        getTaskList();
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        let newValues = {...values};
        newValues = {...newValues, [name]: value};

        let newErrors = {...errors};
        let regaxStrig = /^[a-zA-Z]+$/;
        if(!regaxStrig.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid!';
        } else {
            newErrors[name] = '';
        }

        setValues(newValues);
        setErrors(newErrors);
    }

    const addTask = () => {
        dispatch({
            type: ADD_TASK_API,
            taskName: values.taskName
        });
        setValues(state => ({...state, taskName: ''}));
    }

    const delTask = (taskNameCurrent) => {
        dispatch({
            type: DELETE_TASK_API,
            taskName: taskNameCurrent
        })
    }

    const checkTask = (taskNameEdit) => {
        dispatch({
            type: CHECK_TASK_API,
            taskName: taskNameEdit
        })
    }

    const rejectTask = (taskNameReject) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName: taskNameReject
        })
    }

    return ( 
        <div>
            <div className="card">
                <button className='btn btn-success' onClick={getTaskList}>Dispatch action saga getTaskApi</button>
                <div className="card__header">
                    <img src="./assets/images/bg.png" />
                </div>
                {/* <h2>hello!</h2> */}
                <div className="card__body">
                    <div className="card__content">
                        <div className="card__title">
                            <h2>My Tasks</h2>
                            <p>September 9,2020</p>
                        </div>
                        <div className="card__add">
                            <input onChange={handleChange} value={values.taskName} id="newTask" type="text" name='taskName' placeholder="Enter an activity..." />
                            <button id="addItem" onClick={addTask}>
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className='text text-danger'>{errors.taskName}</p>
                        <div className="card__todo">
                            {/* Uncompleted tasks */}
                            <ul className="todo" id="todo">
                                {taskList.filter(task => !task.status).map((task, index) => (
                                    <li key={index}>
                                        <span>{task.taskName}</span>
                                        <div className="buttons">
                                            <button className="remove" type='button' onClick={() => delTask(task.taskName)}>
                                                <i className="fa fa-trash-alt" />
                                            </button>
                                            <button className="complete" type='button' onClick={() => checkTask(task.taskName)}>
                                                <i className="far fa-check-circle" />
                                                <i className="fas fa-check-circle" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                            {taskList.filter(task => task.status).map((task, index) => (
                                <li key={index}>
                                    <span>{task.taskName}</span>
                                    <div className="buttons">
                                        <button className="remove" type='button' onClick={() => delTask(task.taskName)}>
                                            <i className="fa fa-trash-alt" />
                                        </button>
                                        <button className="complete" type='button' onClick={() => rejectTask(task.taskName)}>
                                            <i className="far fa-undo" />
                                            <i className="fas fa-undo" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default BaiTapToDoListSaGa;