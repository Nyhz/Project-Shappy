import axios from 'axios';

class ShopService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/shop`,
            withCredentials: true
        })
    }

    buyShield = () => this.instance.put("/shield")
    buyAttack = () => this.instance.put("/attack")
}

export default ShopService;