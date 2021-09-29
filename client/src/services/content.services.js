import axios from 'axios';

class ContentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/content`,
            withCredentials: true
        })
    }

    addLike = (imageId) => this.instance.put(`/image/${imageId}/like`, { imageId })
    addDislike = (imageId) => this.instance.put(`/image/${imageId}/dislike`, { imageId })
    refreshImage = (imageId) => this.instance.get(`/image/${imageId}/get`, { imageId })
    addShield = (imageId) => this.instance.put(`/image/${imageId}/shield`, { imageId })
}

export default ContentService;