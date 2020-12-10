const {parseCookies} = require("../system")
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
    setSession({timeout,route,res}) {
        if(!this.session[id]){
            const id = this.createSessionId();
            const date = new Date().setTime(timeout);
            item
            this.session[id] = {
                timeout,
                route,
                id,
                expiryDate:date
            }
            const cookieToSet = useCookies({session:id})
            res.writeHead(200,{
                "Set-Cookie":cookieToSet
            })
        }
    }
    destroySession(id) {
        delete this.session[id];
    }
    updateSessionTimeout(id) {
        if(this.session[id]){
            this.session[id] = { ...this.session[id], ...newData }
        }
    }
    validateSession(req,res){
        var sessionCookie = parseCookies(req);
        if(sessionCookie.session){
            var currentDate = new Date().getTime();
            if(currentDate > this.session[sessionCookie.session].expiryDate){
                res.writeHead(302,{
                    "Location":this.session[sessionCookie.session].route
                })
            } else {
                var sessionExpiry = new Date().setTime(this.session[sessionCookie.session].timeout)
                updateSessionTimeout(id,{expiryDate:sessionExpiry})
            }
        }
    }
}
var session = new Session();
module.exports = {session}