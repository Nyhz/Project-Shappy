import axios from 'axios';

class PaymentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/stripe`,
            withCredentials: true
        })
    }

    addCoins = (amount) => this.instance.put(`/addcoins/${amount}`, amount)
}

export default PaymentService;