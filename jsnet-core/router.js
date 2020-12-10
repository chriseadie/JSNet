const url = require("url");
const path = require("path");
const {
    assignStaticFileHeaders,
    createResponseObject,
    parseUrl,
    fetchPublicAssets,
} = require("./system");
const {Singleton,Session} = require("./Collections")

const routerSwitch = (request, response) => {
    if (request.method === "POST") {
        postRouter(request, response)
    } else {
        if (request.url !== "/favicon.ico") {
            getRouter(request, response)
        }
    }
}
const postRouter = (request, response) => {
    let body = []
    request.on("data", (chunk) => {
        body.push(chunk)
    }).on("end", () => {
        let postBodyData = Buffer.concat(body).toString();
        router(request.url, response,request, JSON.parse(postBodyData))
    })
}
const getRouter = async (request, response) => {
    var route = url.parse(request.url, true);
    if (route.query) {
        await router(route.pathname, response, request, route.query)
    } else {
        await router(route.pathname, response,request)
    }
}
const router = async (url, response, request, data) => {
    if (url.indexOf("~") > -1) {
        assignStaticFileHeaders(response, url)
        response.write(fetchPublicAssets(url));
    } else {
        if(Session.sessionSettings.isActive){
            Session.setSession({
                req:request,
                res:response
            })
            Session.validateSession(request,response)
        }
        try {
            let controllerPath = parseUrl(url);
            let loadControllerModule = await require(path.resolve(__dirname + `../../../Controllers/${controllerPath.controller}.js`));
            let dependencies = injectDependencies(loadControllerModule);
            let createControllerInstance = new loadControllerModule(...dependencies);
            createResponseObject(response, createControllerInstance[controllerPath.method]({ ...data }))
        } catch (err) {
            createResponseObject(response, {
                statusCode: 500,
                type: "document",
                body: err.toString()
            })
        }
    }
    return response.end()
}

const injectDependencies = (loadControllerModule) => {
    var di = loadControllerModule.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
    if(di.length > 1){
        var injecables = di[1].split(",")

        var dependencies = []
        injecables.forEach(dep => {
            const dependencyKey = dep.trim()
            dependencies.push(Singleton.get(dependencyKey));
        })
        return dependencies
    }
    return new Array();
}

module.exports = routerSwitch;