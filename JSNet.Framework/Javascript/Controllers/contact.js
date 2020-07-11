const { View } = require("jsnet-core");

class ContactController {
    index() {
        return View("contact.html")
    }
}
module.exports = ContactController;