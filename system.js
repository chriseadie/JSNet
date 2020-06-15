var fs = require("fs");
const splitParams = (arr) => {
    return arr.splice(2, arr.length)
}
const createResponseObject = (response, options) => {
    if (options.statusCode === 301) {
        response.writeHead(options.statusCode, {
            "Location": options.redirect
        })
        return response.end()
    } else {
        response.writeHead(options.statusCode, {
            "content-type": options.type
        })
        return response.write(options.body)
    }
}
const setDefaultHeaders = (response) => {
    response.setHeader("x-powered-by", "JSNet")
}
module.exports = {
    createResponseObject,
    setDefaultHeaders,
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
        let pathToAsset = path.slice(2);
        var file = fs.readFileSync(`./wwwroot${pathToAsset}`, (err, data) => {
            return data;
        })
        return file;
    }
}