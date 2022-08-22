import axios from "axios"
import { DOMAIN_CYBERBUG, TOKEN } from './../util/constants/settingSystem';

class CyberbugsService {
    constructor() {

    }

    signinCyberBugs = (userLogin) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    }

    getAllProjectCategory = () => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
            method: 'GET'
        })
    }

    createProject = (models) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProject`,
            method: 'POST',
            data: models
        })
    }

    createProjectAuthorization = (newProject) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    getAllProject = () => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),
            }
        })
    }

    updateProject = (projectUpdate) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'POST',
            data: projectUpdate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}

const cyberbugsService = new CyberbugsService();
export default cyberbugsService;