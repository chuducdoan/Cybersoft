import { EDIT_PROJECT } from "../constants/Cyberbugs/CyberbugsConst";

const stateDefault = {
    projectList: [],
    projectEdit: {"id": 0, "projectName": "tring", "creator": 0, "description": "string", "categoryId": "2"}
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
        default: 
            return {...state};
    }
}

export default ProjectReducer;