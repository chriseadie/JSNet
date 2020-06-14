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
module.exports = {
    createResponseObject
}