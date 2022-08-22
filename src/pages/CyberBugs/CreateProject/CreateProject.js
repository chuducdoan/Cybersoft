import { Editor } from '@tinymce/tinymce-react';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_API } from '../../../redux/constants/Cyberbugs/CyberbugsConst';
import EditorComp from '../../../components/Editor/EditorComp';

function CreateProject({values, errors, handleChange, setFieldValue}) {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_API
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: CREATE_PROJECT_SAGA,
            payload: values
        })
    }

    const handleChangeEdit = (content, editor) => {
        setFieldValue('description', content)
    }

    return ( 
        <div className="container p-2">
           <h3>Create Project</h3>
           <form className="container" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name="projectName" onChange={handleChange}/>
                </div>
                <div className="form-group mt-3">
                    <p>Description</p>
                    <EditorComp handleChangeEdit={handleChangeEdit}/>
                </div>
                <div className="form-group mt-3">
                    <select name="categoryId" className="form-control" onChange={handleChange}>
                        {arrProjectCategory.map((value, index) => (
                            <option value={value.id} key={index}>{value.projectCategoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mt-3">
                    <button className="btn btn-outline-primary">Create Project</button>
                </div>
           </form>
        </div>
     );
}

const createProjectForm = withFormik({
    // Khi props thay doi no se binding lai mapPropsToValues
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }

    },

    validationSchema: Yup.object().shape({
        
    }),

    displayName: 'CreateProjectFormik'
})(CreateProject)

const mapStateToProps = (state) => {
    return {
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
    }
}

export default connect(mapStateToProps)(createProjectForm);