const http = require("http");

class List {
    constructor() {
        this.list = []
    }
    add(item) {
        this.list.push(item)
    }
    remove(index) {
        this.list.splice(index, 1)
    }
    replace(index, value) {
        this.list.splice(index, 1, value)
    }
    ToList() {
        return this.list;
    }
}

class Dictionary {
    constructor() {
        this.dict = {}
    }
    add(key, value) {
        var obj = { [key]: value }
        var retVal = Object.assign(this.dict, obj)
        this.dict = retVal;
    }
    update(key, value) {
        this.add(key, value)
    }
    remove(key) {
        delete this.dict[key]
    }
}

class HttpClient {
    constructor() {
        this.data;
    }
    get(url, callback) {
        http.get(url, resp => {
            resp.on("data", (chunk) => {
                this.data += chunk
            })
            resp.on("end", () => {
                var stringData = Buffer.concat(this.data).toString();
                this.data = JSON.parse(stringData)
                callback(JSON.parse(stringData))
            })
        })
        return this.data;
    }
}


module.exports = {
    List,
    Dictionary,
    HttpClient
}