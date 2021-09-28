import axios from 'axios';

class ProfileService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/profile`,
            withCredentials: true
        })
    }

    getInfo = () => this.instance.get("/")
}

export default ProfileService;