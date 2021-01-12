var fs = require("fs");
let Config = require("./JSNet/Configure");

const splitParams = (arr) => {
    return arr.splice(2, arr.length)
}

module.exports = {
    createResponseObject:function (response, options) => {
    if(response.getHeader("Location")){
        response.writeHead(302, {
            "Location": response.getHeader("Location")
        })
        return response.end()
    }
    if (options.statusCode === 301) {
        response.writeHead(options.statusCode, {
            "Location": options.redirect
        })
        return response.end()
    } else {
        response.writeHead(options.statusCode, {
            "Content-Type": options.type
        })
        return response.write(options.body)
    }
    },
    assignStaticFileHeaders: function  (res, url) => {
    if (url.indexOf("serviceworker.js") > -1) {
        res.writeHead(200, {
            "Content-Type": "text/javascript",
            "Service-Worker-Allowed": "/"
        })
    } else if (url.indexOf(".js") > -1) {
        res.writeHead(200, {
            "Content-Type": "text/javascript"
        })
    }
    if (url.indexOf(".css") > -1) {
        res.writeHead(200, {
            "Content-Type": "text/css"
        })
    }
    return res;
    },
    setDefaultHeaders: function  (response) => {
    response.setHeader("x-powered-by", "JSNet")
    },
    Config,
    parseUrl: function (url) {
        var urlArr = url.slice(1).split("/");
        return {
            controller: urlArr[0] ? urlArr[0] : "home",
            method: urlArr[1] ? urlArr[1] : "index",
            params: splitParams(urlArr)
        }
    },
    parseCookies: function (request) {
        let cookieDict = {}
        let reqCookies = request.headers.cookie;
        reqCookies && reqCookies.split(";").forEach(cookie => {
            let parts = cookie.split("=");
            cookieDict[parts.shift().trim()] = decodeURI(parts.join('='));
        })
        return cookieDict
    },
    useCookies: function (cookies) {
        let cookieList = [];
        for ([key, value] of Object.entries(cookies)) {
            cookieList.push(`${key}=${encodeURIComponent(value)}`)
        }
        return cookieList.join("; ")
    },
    fetchPublicAssets: function (path) {
        pathArr = path.split("~")
        let pathToAsset = pathArr[1];
        var file = fs.readFileSync(`./wwwroot${pathToAsset}`, (err, data) => {
            return data;
        })
        return file;
    }
}
