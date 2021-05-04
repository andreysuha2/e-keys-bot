import Server from "./index";

class Router {
    constructor(routes) {
        Object.defineProperties(
            this, {
                server: {
                    value: new Server(
                        process.env.SERVER_PROTOCOL,
                        process.env.SERVER_HOST,
                        process.env.SERVER_PORT
                    )
                }
            }
        );
        this._initRoutes(routes);
    }

    _initRoutes(routes, parentPath = "") {
        routes.forEach(route => {
            if(
                route.hasOwnProperty("handler") &&
                route.hasOwnProperty("controller") &&
                route.hasOwnProperty("method")
            ) {
                this._initRoute(
                    `${parentPath}${route.url}`,
                    route.method,
                    route.controller,
                    route.handler
                );
            }

            if(route.hasOwnProperty("children")) {
                this._initRoutes(
                    route.children,
                    route.url
                )
            }
        });
    }

    _initRoute(url, method, controller, handler) {
        this.server.request(url, method, controller[handler].bind(controller));
    }
}

export default Router;