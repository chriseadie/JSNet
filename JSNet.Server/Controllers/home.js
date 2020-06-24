const { View } = require("../core");
class HomeController {
    index() {
        const model = { foo: "bar stool", arr: [{ name: "steve" }, { name: "Jay" }] };
        return View("index.html", model)
    }
    offline() {
        return View("offline.html")
    }
}
module.exports = HomeController;