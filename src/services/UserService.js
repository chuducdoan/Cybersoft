import { baseService } from "./baseService";

class UserService extends baseService {
    constructor() {
        super()
    }

    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    }

    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject);
    }
}

const userService = new UserService();
export default userService;