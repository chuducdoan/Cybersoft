import { EDIT_PROJECT, GET_ALL_PRIORITY, GET_ALL_TASK_TYPE, GET_PROJECT_DETAIL } from "../constants/Cyberbugs/CyberbugsConst";

const stateDefault = {
    projectList: [
    ],
    projectEdit: {"id": 0, "projectName": "tring", "creator": 0, "description": "string", "categoryId": "2"},
    projectDetail: {},
    arrTaskType: [],
    arrPriority: []
}

const ProjectReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'GET_ALL_PROJECT': {
            state.projectList = action.payload;
            return {...state};
        }
        case EDIT_PROJECT: {
            state.projectEdit = action.projectEditModel;
            console.log("ab", action.projectEditModel)
            return {...state};
        }
        case GET_PROJECT_DETAIL: {
            state.projectDetail = action.projectDetail;
            return {...state};
        }
        case GET_ALL_TASK_TYPE: {
            state.arrTaskType = action.arrTaskType;
            return {...state};
        }
        case GET_ALL_PRIORITY: {
            state.arrPriority = action.arrPriority;
            return {...state};
        }
        default: 
            return {...state};
    }
}

export default ProjectReducer;