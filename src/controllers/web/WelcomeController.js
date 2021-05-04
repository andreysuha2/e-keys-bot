import Controller from "core-controller";

class WelcomeController extends Controller {
    constructor() {
        super({ name: "Welcome" });
    }

    welcome() {
        return "ok";
    }
}

export default WelcomeController;