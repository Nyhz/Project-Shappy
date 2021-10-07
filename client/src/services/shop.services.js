import axios from 'axios';

class ShopService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/shop`,
            withCredentials: true
        })
    }

    buyShield = () => this.instance.put("/shield")
    buyFiveShields = () => this.instance.put("/fiveshields")
    buyAttack = () => this.instance.put("/attack")
    buyFiveAttacks = () => this.instance.put("/fiveattacks")
}


export default ShopService;