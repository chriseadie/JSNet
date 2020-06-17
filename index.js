const http = require("http");
const { View } = require("./core")
const { createResponseObject, parseUrl, fetchPublicAssets, setDefaultHeaders, Config } = require("./system");

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
        let splitUrl = parseUrl(req.url);
        await router(req.url, res, splitUrl.params)
    }
    const router = async (url, res, data) => {
        if (url.indexOf("~") > -1) {
            res.write(fetchPublicAssets(url));
        } else {
            let getModule = parseUrl(url);
            let instance = await require(`./Controllers/${getModule.controller}.js`)
            let i = new instance();
            if (typeof i[getModule.method] === 'function') {
                createResponseObject(res, i[getModule.method](data))
            } else {
                res.write(View("404.html"))
            }
        }
        return res.end()
    }
}
ConfigureServices()
Configure();