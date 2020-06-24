const http = require("http");
const url = require("url");
const { NotFound } = require("./core")
const {
    assignStaticFileHeaders,
    createResponseObject,
    parseUrl,
    fetchPublicAssets,
    setDefaultHeaders,
    Config
} = require("./system");

function ConfigureServices() {
    var app = new Config();
    app.addSingleton("service", Object)
}
function Configure() {
    http.createServer((request, response) => {
        // added powered by header to response
        setDefaultHeaders(response);
        //adding router switch for defining get and post methods
        routerSwitch(request, response);
    }).listen(8080)
    const routerSwitch = (req, res) => {
        if (req.method === "POST") {
            postRouter(req, res)
        } else {
            if (req.url !== "/favicon.ico") {
                getRouter(req, res)
            }
        }
    }
    const postRouter = (req, res) => {
        let body = []
        req.on("data", (chunk) => {
            body.push(chunk)
        }).on("end", () => {
            var data = Buffer.concat(body).toString();
            router(req.url, res, JSON.parse(data))
        })
    }
    const getRouter = async (req, res) => {
        var route = url.parse(req.url, true);
        if (route.query) {
            await router(route.pathname, res, route.query)
        } else {
            await router(route.pathname, res)
        }
    }
    const router = async (url, res, data) => {
        if (url.indexOf("~") > -1) {
            assignStaticFileHeaders(res, url)
            res.write(fetchPublicAssets(url));
        } else {
            try {
                let getModule = parseUrl(url);
                let instance = await require(`./Controllers/${getModule.controller}.js`)
                let i = new instance();
                createResponseObject(res, i[getModule.method]({ ...data }))
            } catch (err) {
                createResponseObject(res, NotFound("404.html"))
            }
        }
        return res.end()
    }
}
ConfigureServices()
Configure();