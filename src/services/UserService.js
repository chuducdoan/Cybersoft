import { baseService } from "./baseService";

class UserService extends baseService {
    constructor() {
        super()
    }

    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    }
}

const userService = new UserService();
export default userService;