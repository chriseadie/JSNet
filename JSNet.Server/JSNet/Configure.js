class Configure {
    addSingleton(key, value) {
        global[key] = new value();
    }
    destroySingleton(key) {
        delete global[key];
    }
}
module.exports = Configure;