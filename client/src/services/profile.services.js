import axios from 'axios';

class ProfileService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/profile`,
            withCredentials: true
        })
    }

    getInfo = () => this.instance.get("/")
    getGroups = () => this.instance.get("/groups")
}

export default ProfileService;