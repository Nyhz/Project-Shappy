import axios from 'axios';

class ContentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/content`,
            withCredentials: true
        })
    }

    addLike = () => this.instance.put('/image/addlike')
}

export default ContentService;