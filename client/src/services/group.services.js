import axios from 'axios';

class GroupService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/group`,
            withCredentials: true
        })
    }

    create = (name, password, endDate, owner) => this.instance.post("/create", { name, password, endDate, owner })
    getGroups = () => this.instance.get('/list')
}

export default GroupService;