var fs = require("fs");
var nunjucks = require("nunjucks")
nunjucks.configure("Views", { autoescape: true })
const splitParams = (arr) => {
    return arr.splice(2, arr.length)
}



module.exports = {
    View: function (view, model) {
        var template = nunjucks.render(view, model)
        return {
            statusCode: 200,
            type: { "Context-Type": "text/html" },
            body: template
        }
    },
    RedirectToAction: function (redirectUrl) {
        return {
            statusCode: 301,
            type: { "Context-Type": "text/html" },
            redirect: redirectUrl,
        }
    },
    parseUrl: function (url) {
        var urlArr = url.slice(1).split("/");
        return {
            controller: urlArr[0] ? urlArr[0] : "home",
            method: urlArr[1] ? urlArr[1] : "index",
            params: splitParams(urlArr)
        }
    },
    fetchPublicAssets: function (path) {
        let pathToAsset = path.slice(2);
        var file = fs.readFileSync(`./wwwroot${pathToAsset}`, (err, data) => {
            return data;
        })
        return file;
    },
    Ok: function (json) {
        return {
            statusCode: 200,
            type: { "Context-Type": "application/json" },
            body: JSON.stringify(json)
        }
    },
    BadRequest: function (response) {
        return {
            statusCode: 400,
            type: { "Context-Type": "text/plain" },
            body: JSON.stringify(response)
        }
    }
}