const { View } = require("../core");

class ContactController {
    index() {
        return View("contact.html")
    }
}
module.exports = ContactController;