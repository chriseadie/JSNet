const { View, Ok, BadRequest } = require("../core");

class AboutController {
    index() {
        return View("about.html")
    }
    candidate(id) {
        let candidateId = { id: id[0] }
        return View("candidate.html", candidateId)
    }
    getCanidateById(id) {
        var obj = {
            hh: id,
            other: {
                testing: "this works"
            }
        }
        return Ok(obj)
    }
}
module.exports = AboutController;