const httpClient = require("./HttpClient");

class Singleton {
    constructor(){
        this.singltons = {
            "httpClient":new httpClient()
        }
    }
    add(key,instance){
        this.singltons[key] = instance;
    }
    get(key){
        return this.singltons[key];
    }
}

module.exports = new Singleton();