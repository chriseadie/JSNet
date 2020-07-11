class Configure {
    addToGlobalScope(key, value) {
        global[key] = new value();
    }
    destroyFromGlobalScope(key) {
        delete global[key];
    }
}
module.exports = Configure;