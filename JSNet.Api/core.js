var nunjucks = require("nunjucks")
nunjucks.configure("Views", { autoescape: true })
module.exports = {
    RedirectToAction: function (redirectUrl) {
        return {
            statusCode: 301,
            type: "text/html",
            redirect: redirectUrl,
        }
    },
    Ok: function (json) {
        return {
            statusCode: 200,
            type: "application/json",
            body: JSON.stringify(json)
        }
    },
    BadRequest: function (response) {
        return {
            statusCode: 400,
            type: "text/plain",
            body: JSON.stringify(response)
        }
    }
}