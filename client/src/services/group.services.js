import axios from 'axios';

class GroupService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/group`,
            withCredentials: true
        })
    }

    create = (name, password, endDate, owner, groupAvatar) => this.instance.post("/create", { name, password, endDate, owner, groupAvatar })
    join = (secret) => this.instance.put(`/join/${secret}`)
    getGroups = () => this.instance.get('/list')
    getSummary = (groupId) => this.instance.get(`/summary/${groupId}`)
    getSingleGroup = (groupId) => this.instance.get(`/images/${groupId}`)
    getSlanders = (groupId) => this.instance.get(`/slanders/${groupId}`)
    getImageByLikes = (groupId) => this.instance.get(`/morelikes/${groupId}`)
    getGroupEnd = () => this.instance.get('/groupend')
}

export default GroupService;