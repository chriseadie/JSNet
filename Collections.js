const https = require("https");
const url = require("url")
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
    }
    async get(url, callback) {
        https.get(url, resp => {
            let data = '';
            resp.on("data", (chunk) => {
                data += chunk
            })
            resp.on("end", () => {
                callback(JSON.parse(data))
            })
        })
    }
    post(postLink, payload, callback) {
        const data = JSON.stringify(payload)
        var args = url.parse(postLink, true);
        let options = {
            hostname: args.host,
            path: args.path,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                callback(JSON.parse(data));
            })
        });
        req.write(data)
    }
}


module.exports = {
    List,
    Dictionary,
    HttpClient
}