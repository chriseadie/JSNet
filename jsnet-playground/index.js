const http = require("http");




function createApplication() {
    var app = {};
    app.listen = function listen() {
        var server = http.createServer(this);
        app.service = server.listen.apply(server, arguments);
        return app.service
    }
    app.get = function get(path, next) {
        return next();
    }
    app.post = function post(path, next) {
        return next()
    }

    return app;
}

var test = createApplication()

console.log(test.service)

test.get("/", () => {
    console.log("testing")
})
