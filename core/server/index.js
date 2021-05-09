import http from "http";
import Auth from "./auth";

class Server {
    constructor(protocol, host, port) {
        Object.defineProperties(this, { routes: { value: {} } });

        const server = http.createServer(async (req, res) => {
            const auth = new Auth(req),
                isAuth = await auth.success();
            if(!isAuth) {
                res.writeHead(401);
                res.end();
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Request-Method', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.setHeader('Content-Type', "application/json");
            if(req.method === "OPTIONS") {
                res.writeHead(200);
                res.end();
                return;
            };
            const url = new URL(`${protocol || "http"}://${host}:${port}${req.url}`);
            if(this.routes.hasOwnProperty(req.method) && this.routes[req.method].hasOwnProperty(url.pathname)) {
                try {
                    let body = "";
                    req.query = url.searchParams;
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on("end", async () => {
                        req.body = body ? JSON.parse(body) : {};
                        const resData = await this.routes[req.method][url.pathname](res, req);
                        res.end(JSON.stringify(resData || null));
                    });
                } catch (e) {
                    console.log(e);
                    res.writeHead(500);
                    res.end(JSON.stringify({ message: "Server error", e }));
                }
            } else {
                res.writeHead(404);
                res.end("Url not found");
            }
        });

        server.listen(port, host, () => {
            console.log(`Server running at ${host}:${port}!`);
        });
    }



    request(url, method, handler) {
        method = method.toUpperCase();
        const availableMethods = ["POST", "GET", "PUT", "DELETE", "OPTIONS"];
        if (!availableMethods.includes(method)) throw new Error(`Try to use invalid method ${method}`);
        if (!this.routes.hasOwnProperty(method)) this.routes[method] = {};
        if (!this.routes[method].hasOwnProperty(url)) this.routes[method][url] = handler;
        else throw new Error(`Dublicate URL ${url} for method ${method}`);
    }

    get route() {
        return {
            post: (url, handler) => this.request(url, "post", handler),
            get: (url, handler) => this.request(url, "get", handler),
            put: (url, handler) => this.request(url, "put", handler),
            delete: (url, handler) => this.request(url, "delete", handler),
            options: (url, handler) => this.request(url, "options", handler)
        }
    }
}


export default Server;