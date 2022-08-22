import EditorComp from './../../Editor/EditorComp';
import { useCallback, useEffect } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_API, SET_SUBMIT_EDIT, UPDATE_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs/CyberbugsConst';
import {withFormik} from 'formik';
import * as Yup from 'yup';

function FormEditProject({values, handleChange, setFieldValue}) {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const projectEdit = useSelector(state => state.ProjectReducer.projectEdit);
    const dispatch = useDispatch();
    

    const submitForm = (e) => {
        e.preventDefault();
        // Khi nguoi dung bam submit => dua du lieu ve backend
        dispatch({
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values
        })
    }

    useEffect(() => {
        // goi api load project category
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_API
        })
        dispatch({
            type: SET_SUBMIT_EDIT,
            callBackSubmit: submitForm
        })
    })

    const handleChangeEdit = useCallback((content, editor) => {
        setFieldValue('description', content);
    }, [])

    return ( 
        <form className="contaier" onSubmit={submitForm}> 
            <div className="row">
            <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input disabled className="form-control" name="id" value={values.id}/>
                    </div>   
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input className="form-control" name="projectName" value={values.projectName} onChange={handleChange}/>
                    </div>   
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Category name</p>
                        <select name='categoryId' className="form-control" value={values.categoryId} onChange={handleChange}>
                            {arrProjectCategory.map((value, index) => (
                                <option value={value.id} key={index}>{value.projectCategoryName}</option>
                            ))}
                        </select>
                    </div> 
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold mt-2">Description</p>
                        <EditorComp initialValue={values.description} handleChangeEdit={handleChangeEdit}/>
                    </div>
                </div>
            </div>
        </form>
    );
}

const FormEditProjectWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            id: props.projectEdit.id,
            projectName: props.projectEdit.projectName,
            categoryId: props.projectEdit.categoryId,
            description: props.projectEdit.description
        }
    },
    validationSchema: Yup.object().shape({

    }),
    displayName: 'FormEdit'
})(FormEditProject);

const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}

export default connect(mapStateToProps)(FormEditProjectWithFormik);