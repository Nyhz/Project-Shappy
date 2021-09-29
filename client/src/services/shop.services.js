import axios from 'axios';

class ShopService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/shop`,
            withCredentials: true
        })
    }

    buyShield = () => this.instance.get("/shield")
    buyAttack = () => this.instance.get("/attack")
}

export default ShopService;