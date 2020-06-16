const https = require("https");
const url = require("url");
class HttpClient {
    constructor() {
    }
    get(url, callback) {
        https.get(url, resp => {
            let data = '';
            resp.on("data", (chunk) => {
                data += chunk
            })
            resp.on("end", () => {
                return callback(JSON.parse(data))
            })
        })
    }
    post(postLink, payload, callback) {
        const data = JSON.stringify(payload)
        var args = url.parse(postLink, true);
        let options = {
            hostname: args.host,
            path: args.path,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                return callback(JSON.parse(data));
            })
        });
        req.write(data)
    }
}
module.exports = HttpClient;