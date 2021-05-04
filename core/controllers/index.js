import register from "./controllersRegister";

class Controller {
    constructor({ name }) {
        register.registration(name, this);
    }
}

export default Controller;