import axios from "./axios";
class AuthService {
     async login(account) {
        return await axios.get('/login/',account)
    }
}

export default new AuthService()
