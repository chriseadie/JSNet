const http = require("http");
const { setDefaultHeaders, routerSwitch } = require("jsnet-core");

function ConfigureServices() {
}
function Configure() {
    http.createServer((request, response) => {
        response.writeHead({ "Access-Control-Allow-Origin": "*" })
        setDefaultHeaders(response);
        routerSwitch(request, response);
    }).listen(8080)
}
ConfigureServices()
Configure();