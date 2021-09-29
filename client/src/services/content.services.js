import axios from 'axios';

class ContentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/content`,
            withCredentials: true
        })
    }

<<<<<<< HEAD
    addLike = (imageId, userId) => this.instance.post('/image/addlike', { imageId, userId })
=======
    addLike = () => this.instance.put('/image/addlike')
>>>>>>> dany
}

export default ContentService;