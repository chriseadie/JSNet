const { View } = require("../core");
class HomeController {
    index() {
        const model = { foo: "bar stool", arr: [{ name: "steve" }, { name: "Jay" }] };
        return View("index.html", model)
    }
}
module.exports = HomeController;