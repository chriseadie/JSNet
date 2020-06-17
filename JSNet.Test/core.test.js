const { RedirectToAction, Ok, BadRequest } = require("../JSNet.Server/core");

describe("Core Js Tests", () => {

    it("Tests the redirect Response", () => {
        var redirect = RedirectToAction("/about")
        expect(typeof redirect).toBe("object");
        expect(redirect.statusCode).toEqual(301);
        expect(redirect.redirect).toBe("/about");
        expect(redirect.type).toEqual({ "Context-Type": "text/html" });
    });

    it("Test the Ok response type", () => {
        var okResponse = Ok({ name: "testing" });
        expect(typeof okResponse).toBe("object");
        expect(okResponse.statusCode).toEqual(200);
        expect(okResponse.type).toEqual({ "Context-Type": "application/json" });
        expect(okResponse.body).toEqual('{"name":"testing"}');
    });

    it("Test the BadRequest type", () => {
        var badResponse = BadRequest({ name: "testing" });
        expect(typeof badResponse).toBe("object");
        expect(badResponse.statusCode).toEqual(400);
        expect(badResponse.type).toEqual({ "Context-Type": "text/plain" });
        expect(badResponse.body).toEqual('{"name":"testing"}');
    })

})