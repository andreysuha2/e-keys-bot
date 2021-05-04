import webRoutes from "./routes/web";
import botRoutes from "./routes/bot"
import Router from "core-router";
import { bot, botControllers } from "root-bootstrap";

class App {
    constructor() {
        Object.defineProperties(this, {
            webRouter: { value: new Router(webRoutes) },
            botRouter: { value: botRoutes(bot, botControllers) }
        });
    }

    bootstrap() {}
}

export default App;