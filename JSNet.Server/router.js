const url = require("url");
const { NotFound } = require("./core")
const path = require("path");
const {
    assignStaticFileHeaders,
    createResponseObject,
    parseUrl,
    fetchPublicAssets,
} = require("./system");

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
        router(request.url, response, JSON.parse(postBodyData))
    })
}
const getRouter = async (request, response) => {
    var route = url.parse(request.url, true);
    if (route.query) {
        await router(route.pathname, response, route.query)
    } else {
        await router(route.pathname, response)
    }
}
const router = async (url, response, data) => {
    if (url.indexOf("~") > -1) {
        assignStaticFileHeaders(response, url)
        response.write(fetchPublicAssets(url));
    } else {
        try {
            let controllerPath = parseUrl(url);
            let loadControllerModule = await require(path.resolve(__dirname + `/Controllers/${controllerPath.controller}.js`));
            let createControllerInstance = new loadControllerModule();
            createResponseObject(response, createControllerInstance[controllerPath.method]({ ...data }))
        } catch (err) {
            createResponseObject(response, NotFound("404.html"))
        }
    }
    return response.end()
}

module.exports = routerSwitch;