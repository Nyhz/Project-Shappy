import axios from 'axios';

class ContentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/content`,
            withCredentials: true
        })
    }

    getUser = (userId) => this.instance.get(`/getuser/${userId}`)

    addLike = (imageId) => this.instance.put(`/image/${imageId}/like`, { imageId })
    addDislike = (imageId) => this.instance.put(`/image/${imageId}/dislike`, { imageId })
    refreshImage = (imageId) => this.instance.get(`/image/${imageId}/get`, { imageId })
    addShield = (imageId) => this.instance.put(`/image/${imageId}/shield`, { imageId })
    addAttack = (imageId) => this.instance.put(`/image/${imageId}/attack`, { imageId })

    addSlanderLike = (slanderId) => this.instance.put(`/slander/${slanderId}/like`, { slanderId })
    addSlanderDislike = (slanderId) => this.instance.put(`/slander/${slanderId}/dislike`, { slanderId })
    refreshSlander = (slanderId) => this.instance.get(`/slander/${slanderId}/get`, { slanderId })
    addSlanderShield = (slanderId) => this.instance.put(`/slander/${slanderId}/shield`, { slanderId })
    addSlanderAttack = (slanderId) => this.instance.put(`/slander/${slanderId}/attack`, { slanderId })

    getGroups = () => this.instance.get('/getformdata')
    newImage = (image) => this.instance.post('/image', image)
    newSlander = (slander) => this.instance.post('/slander', slander)
}

export default ContentService;