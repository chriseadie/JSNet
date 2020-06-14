const createResponseObject = (response, options) => {
    response.writeHead(options.statusCode, options.type)
    response.write(options.body)
}
module.exports = {
    createResponseObject
}