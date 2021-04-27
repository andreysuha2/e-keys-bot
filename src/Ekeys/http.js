import Http from "app-http";

export default class EkeysHttp extends Http {
    constructor(host, namespace) {
        super({ baseUrl: `${host}/${namespace}` });
    }

    get sync() {
        return this.group("sync", (query) => ({
            read: () => query.get(""),
            update: () => query.put("")
        }));
    }
}