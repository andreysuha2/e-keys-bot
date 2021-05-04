import Users from "root-models/Users";

class Auth {
    constructor(request) {
        Object.defineProperties(this, {
            authHeader: {value: request.headers.authorization}
        });
    }

    async success() {
        if(!this.authHeader) return false;
        else {
            const [ username, password ] = this._getAuthData();
            return this._isAuth(username, password)
        }
    }


    _getAuthData() {
       if(!this.authHeader) return null;
       const [ ,base64str ] = this.authHeader.split(" ");
       return Buffer.from(base64str, "base64").toString().split(":");
    }

    async _isAuth(username, password) {
        const user = await Users.findOne({ username });
        if(!user) return false;
        return user.comparePassword(password);
    }
}


export default Auth;