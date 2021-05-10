import Http from "./http.js";
import SyncLog from "root-models/SyncLog";

class Ekeys {
    constructor(host, namespace, username, password) {
        const auth = `Basic ${Buffer.from(username + ":" + password).toString('base64')}`;
        Object.defineProperties(this, { http: { value: new Http(host, namespace, auth) } });
    }

    getSync() {
        return this._sync("read");
    }

    updateSync() {
        return this._sync("update");
    }

    _sync(type = "read") {
        const that = this;
        return new Promise((resolve, reject) => {
            if(!this.http.sync.hasOwnProperty(type)) {
                reject("Unknow sync method");
                return;
            }
            const query = this.http.sync[type];
            query().then(async ({ data }) => {
                if(type === "update") {
                    const log = new SyncLog(data);
                    await log.save();
                }
                resolve(that._mappedSyncData(data))
            }).catch((e) => reject(e));
        });
    }

    _mappedSyncData(data) {
        if(!data) return null;
        return {
            date: data.date,
            status: data.categories.success ? "Успех" : "Не удача",
            cats: { synced: data.categories.list.length },
            products: {
                synced: data.count,
                added: data.products.inserted.length,
                updated: data.products.updated.length,
                notInStock: data.products.not_in_stock.map((product) => product.sku).join(", ")
            }
        };
    }
}

export default Ekeys;