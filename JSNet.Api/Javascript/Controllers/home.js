const { Ok } = require("jsnet-core");
class HomeController {
    index() {
        const model = { foo: "bar stool", arr: [{ name: "steve" }, { name: "Jay" }] };
        return Ok(model)
    }
}
module.exports = HomeController;