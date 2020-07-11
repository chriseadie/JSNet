class Dictionary {
    constructor() {
        this.dict = {}
    }
    add(key, value) {
        var obj = { [key]: value }
        var retVal = Object.assign(this.dict, obj)
        this.dict = retVal;
    }
    get(key) {
        return this.dict[key];
    }
    update(key, value) {
        this.add(key, value)
    }
    remove(key) {
        delete this.dict[key]
    }
}
module.exports = Dictionary;