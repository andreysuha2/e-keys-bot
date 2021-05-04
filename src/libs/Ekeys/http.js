import Http from "core-http";

export default class EkeysHttp extends Http {
    constructor(host, namespace, auth) {
        super({
            baseUrl: `${host}/${namespace}`,
            headers: { "Authorization": auth }
        });
    }

    get sync() {
        return this.group("sync", (query) => ({
            read: () => query.get(""),
            update: () => query.put("")
        }));
    }
}