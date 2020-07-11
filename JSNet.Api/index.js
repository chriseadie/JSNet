const http = require("http");
const url = require("url");
const { setDefaultHeaders, Config } = require("./system");
const routerSwitch = require("./router");

function ConfigureServices() {
    var app = new Config();
    app.addSingleton("service", Object)
}
function Configure() {
    http.createServer((request, response) => {
        setDefaultHeaders(response);
        routerSwitch(request, response);
    }).listen(8080)
}
ConfigureServices()
Configure();