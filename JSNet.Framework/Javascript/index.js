const http = require("http");
const { routerSwitch, setDefaultHeaders } = require("jsnet-core");


function ConfigureServices() {
}
function Configure() {
    http.createServer((request, response) => {
        setDefaultHeaders(response);
        routerSwitch(request, response);
    }).listen(8080)
}
ConfigureServices()
Configure();