import axios from 'axios';

class GroupService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/group`,
            withCredentials: true
        })
    }

    create = (name, password, endDate, owner) => this.instance.post("/create", { name, password, endDate, owner })
    join = (secret) => this.instance.put(`/join/${secret}`)
    getGroups = () => this.instance.get('/list')
    getSingleGroup = (groupId) => this.instance.get(`/images/${groupId}`)
    getSlanders = (groupId) => this.instance.get(`/slanders/${groupId}`)
}

export default GroupService;