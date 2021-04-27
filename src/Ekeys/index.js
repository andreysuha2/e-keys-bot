import Http from "./http.js";

class Ekeys {
    constructor(host, namespace) {
        Object.defineProperties(this, { http: { value: new Http(host, namespace) } });
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
            query().then(({ data }) => resolve(that._mappedSyncData(data)))
                .catch((e) => reject(e));
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