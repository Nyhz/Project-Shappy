import axios from 'axios';

class ContentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/content`,
            withCredentials: true
        })
    }

    addLike = (imageId, userId) => this.instance.post('/image/addlike', { imageId, userId })
}

export default ContentService;