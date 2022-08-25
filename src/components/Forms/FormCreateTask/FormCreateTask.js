import EditorComp from './../../Editor/EditorComp';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_API, GET_ALL_PROJECT_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_USER_SAGA, SET_SUBMIT_EDIT, UPDATE_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs/CyberbugsConst';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import { Select, Slider } from 'antd';
import { GET_ALL_PRIORITY_SAGA } from './../../../redux/constants/Cyberbugs/CyberbugsConst';

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function FormCreateTask({values, handleChange, setFieldValue}) {

    const projectList = useSelector(state => state.ProjectReducer.projectList)
    const arrTaskType = useSelector(state => state.ProjectReducer.arrTaskType)
    const arrPriority = useSelector(state => state.ProjectReducer.arrPriority)
    const arrUser = useSelector(state => state.UserCyberBugReducer.userSearch)
    const userOption = arrUser.map((item) => {
        return {label: item.name, value: item.userId}
    })

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })
    const dispatch = useDispatch();
    

    const submitForm = (e) => {
        e.preventDefault();
        console.log(values)
        // Khi nguoi dung bam submit => dua du lieu ve backend
        // dispatch({
        //     type: UPDATE_PROJECT_SAGA,
        //     projectUpdate: values
        // })
    }

    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_EDIT,
            callBackSubmit: submitForm
        })
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_ALL_PRIORITY_SAGA
        })
        dispatch({
            type: GET_USER_SAGA,
            keyword: ''
        })
    }, [])

    const handleChangeEdit = (content, editor) => {
        setFieldValue('description', content);
    }

    return ( 
        <form className="contaier" onSubmit={submitForm}> 
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Project</p>
                        <select name='projectId' className='form-control' value={values.projectId}>
                            {projectList.map((item, index) => (
                                <option key={index} value={item.id}>{item.projectName}</option>
                            ))}
                        </select>
                    </div>   
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <div className='row'>
                            <div className='col-6'>
                                <p className="font-weight-bold mt-2">Priority</p>
                                <select className='form-control' name='priorityId'>
                                    {arrPriority.map((item, index) => (
                                        <option key={index} value={item.priorityId}>{item.priority}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-6'>
                                <p className="font-weight-bold mt-2">Task type</p>
                                <select className='form-control' name='typeId'>
                                    {arrTaskType?.map((item, index) => (
                                        <option key={index} value={item.id}>{item.taskType}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                    </div>   
                </div>
                <div className='col-6'>
                    <div className='form-group'>
                        <p className='mt-2'>Assignees</p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            options={userOption}
                            placeholder="Please select"
                            onChange={(value) => {
                                console.log(value)
                            }}
                            optionFilterProp="label"
                            onSelect={(value) => {
                                console.log(value)
                            }}
                        >
                            {children}
                        </Select>
                    </div>
                    <div className='row form-group'>
                        <div className='col-12'>
                            <p style={{marginTop: "27px"}}>Original Estimate</p>
                            <input type="number" min="0" name="originalEstimate" defaultValue="0" className='form-control' height="30" />
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-12'>
                            <p className='mt-2'>Time tracking</p>
                            <Slider defaultValue={30} tooltipVisible value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}/>
                            <div className='row'>
                                <div className='col-6'>
                                    <p className='text-left m-0'>{timeTracking.timeTrackingSpent}h logged</p>
                                </div>
                                <div className='col-6'>
                                    <p className='text-right m-0'>{timeTracking.timeTrackingRemaining}h remaining</p>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-6'>
                                    <p>Time spent</p>
                                    <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                        setTimeTracking({
                                            ...timeTracking,
                                            timeTrackingSpent: e.target.value
                                        })
                                    }}/>
                                </div>
                                <div className='col-6'>
                                    <p>Time remaining</p>
                                    <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                        setTimeTracking({
                                            ...timeTracking,
                                            timeTrackingRemaining: e.target.value
                                        })
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold mt-2">Description</p>
                        <EditorComp  handleChangeEdit={handleChangeEdit}/>
                    </div>
                </div>
            </div>
        </form>
    );
}

const FormCreateTaskWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            taskName: '',
            description: '',
            statusId: '',
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: 0,
            typeId: 0,
            priorityId: 0
        }
    },
    validationSchema: Yup.object().shape({

    }),
    displayName: 'FormEdit'
})(FormCreateTask);

export default FormCreateTaskWithFormik;