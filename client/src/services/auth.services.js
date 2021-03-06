import axios from 'axios';

class AuthService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/auth`,
            withCredentials: true
        })
    }

    signUp = (username, password, email, avatar) => this.instance.post("/signup", { username, password, email, avatar })
    login = (username, password) => this.instance.post("/login", { username, password })
    logout = () => this.instance.get("/logout")
    isloggedin = () => this.instance.post("/isloggedin")
}

export default AuthService;