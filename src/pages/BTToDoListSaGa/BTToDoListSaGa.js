import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskApi, checkTaskApi, delTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction';
import './BTToDoListSaGa.css';

function BaiTapToDoListSaGa() {
    const {taskList} = useSelector(state => state.ToDoListReducer);
    const dispatch = useDispatch();

    const [values, setValues] = useState({taskName: ''});
    const [errors, setErrors] = useState({taskName: ''});

    const getTaskList = () => {
        dispatch(getTaskListApi());
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

    const addTask = (event) => {
        event.preventDefault();
    }

    const delTask = (taskNameCurrent) => {
        
    }

    const checkTask = (taskNameEdit) => {
        
    }

    const rejectTask = (taskNameReject) => {
        
    }

    return ( 
        <form>
            <div className="card">
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
        </form>
     );
}

export default BaiTapToDoListSaGa;