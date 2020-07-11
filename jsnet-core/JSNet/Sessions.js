class Session {
    constructor() {
        this.session = {};
    }
    createSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    getSessionById(id) {
        return this.session[id];
    }
    setSession(data) {
        const id = this.createSessionId();
        this.session[id] = data;
        return id;
    }
    destroySession(id) {
        delete this.session[id];
    }
    updateSessionData(id, newData) {
        this.session[id] = { ...this.session[id], ...newData }
    }
}
module.exports = new Session();