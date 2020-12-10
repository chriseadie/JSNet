const superagent = require('superagent');
class HttpClient {
    constructor() {
    }
    get(url) {
        return superagent.get(url);
    }
    post(url, payload,type = "application/json") {
        return superagent.post(url).type(type).send(payload);
    }
    put(url, payload,type = "application/json"){
        return superagent.put(url).type(type).send(payload);
    }
    delete(url){
        return superagent.delete(url);
    }
}
module.exports = HttpClient;