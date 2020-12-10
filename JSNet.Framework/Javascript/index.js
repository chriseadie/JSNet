const http = require("http");
const { routerSwitch, setDefaultHeaders,Session } = require("jsnet-core");


function ConfigureServices() {
}
function Configure() {
    http.createServer((request, response) => {

        setDefaultHeaders(response);

        Session.createSession({
            timeout:5000,
            path:"/about",
            isActive:true
        })

        routerSwitch(request, response);

    }).listen(8080)
}
Configure();
ConfigureServices()
