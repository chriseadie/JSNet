const { useCookies, parseCookies, parseUrl } = require("../JSNet.Server/system");

describe("System Js Test", () => {

    it("Testing useCookie function", () => {
        var dummyCookies = {
            cook1: 1,
            cook2: 23
        }
        var cookieResponse = useCookies(dummyCookies);
        expect(typeof cookieResponse).toBe("string");
        var splitCookies = cookieResponse.split(";");
        expect(splitCookies[0].trim()).toEqual("cook1=1")
        expect(splitCookies[1].trim()).toEqual("cook2=23")
    });

    it("Testing parseCookes function", () => {
        var cookieString = { headers: { cookie: "cook1=1;cook2=23" } };
        var cookieRes = parseCookies(cookieString);
        expect(typeof cookieRes).toBe("object");
        expect(Object.keys(cookieRes)).toEqual(["cook1", "cook2"]);
        expect(Object.values(cookieRes)).toEqual(["1", "23"])
    });

})