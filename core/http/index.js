import axios from "axios";

class ApiHttp {
    constructor({ baseUrl, headers={} }) {
        Object.defineProperties(this, {
            query: {
                value: axios.create({
                    baseURL: baseUrl,
                    "Content-Type": "application/json",
                    "headers": {
                        'X-Requested-With': 'XMLHttpRequest',
                        ...headers
                    }
                })
            }
        });
    }

    static req() {
        return axios;
    }

    group(groupPath, callback) {
        const __this = this,
            // eslint-disable-next-line no-confusing-arrow
            getPath = (path) => path ? `${groupPath}/${path}` : groupPath,
            group = (path, callback) => __this.group(`${groupPath}/${path}`, callback),
            query = {
                request(config = { url: null }) {
                    return __this.query.request({ url: getPath(config.url), ...config });
                },
                get(path = null, config ={}) { return __this.query.get(getPath(path), config); },
                post(path = null, data = {}, config = {}) { return __this.query.post(getPath(path), data, config); },
                put(path = null, data= {}, config = {}) { return __this.query.put(getPath(path), data, config); },
                delete(path = null, config = {}) { return __this.query.delete(getPath(path), config); },
                options(path = null, config = {}) { return __this.query.options(getPath(path), config); },
                patch(path = null, config = {}) { return __this.query.patch(getPath(path), config); },
                head(path = null, config = {}) { return __this.query.head(getPath(path), config); }
            };
        return callback(query, group);
    }
}

export default ApiHttp;