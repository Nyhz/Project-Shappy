import axios from 'axios';

class BaseService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }
    showDashboard = () => this.instance.get("/list")
    
}

export default BaseService;