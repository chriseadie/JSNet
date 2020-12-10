const {parseCookies,useCookies} = require("../system")
class Session {
    constructor() {
        this.session = {};
        this.sessionSettings = {
            timeoutPeriod:30000,
            isActive:false,
            path:"/"
        }
    }

    createSession({timeout,isActive,path}){
        this.sessionSettings.timeoutPeriod = timeout;
        this.sessionSettings.isActive = isActive;
        this.sessionSettings.path = path;
    }
    createSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    getSessionId(req){
        var sessionCookie = parseCookies(req);
        if(sessionCookie.session){
            return sessionCookie.session
        }
        return ""
    }
    setSession({res,req}) {
        var id = this.getSessionId(req);
        if(!this.session[id]){
            const id = this.createSessionId();
            const date = new Date()
            date.setTime(date.getTime() + this.sessionSettings.timeoutPeriod);
            this.session[id] = {
                id,
                expiryDate:date
            }
            const cookieToSet = useCookies({session:id})
            res.setHeader("Set-Cookie",cookieToSet);
        }
    }
    destroySession(id) {
        delete this.session[id];
    }
    updateSessionTimeout(id,newData) {
        if(this.session[id]){
            this.session[id] = { ...this.session[id], ...newData }
        }
    }
    validateSession(req,res){
        var sessionCookie = parseCookies(req);
        if(sessionCookie.session && this.session[sessionCookie.session]){
            const gt = new Date(this.session[sessionCookie.session].expiryDate)
            if(Date.now() > gt.getTime()){
                res.setHeader("Location",this.sessionSettings.path);
                res.setHeader("Set-Cookie","")
            } else {
                var sessionExpiry = new Date()
                sessionExpiry.setTime(sessionExpiry.getTime() + this.sessionSettings.timeoutPeriod)
                this.updateSessionTimeout(sessionCookie.session,{expiryDate:sessionExpiry})
            }
        }
    }
}
module.exports = new Session();