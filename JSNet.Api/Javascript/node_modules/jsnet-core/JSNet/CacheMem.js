class CacheMem {
    constructor() {
        this.cache = {}
    }
    isCacheExpired() {
        return (this.cache[key].date) < new Date().getTime()
    }
    setCache(key, value, expiry) {
        let date = new Date().getTime() + expiry * 60 * 1000;
        this.cache[key] = {
            date: date,
            data: value
        }
    }
    getCache(key) {
        if (this.cache[key] || this.isCacheExpired()) {
            return Promise.resolve(this.cache[key]["data"])
        }
        delete this.cache[key]
        return Promise.resolve(null);
    }
}
module.exports = CacheMem;