const { View, Ok, BadRequest, RedirectToAction } = require("../core");

class AboutController {
    index() {
        return View("about.html")
    }
    candidate(id) {
        let candidateId = { id: id[0] }
        return View("candidate.html", candidateId)
    }
    redirectToCandidate() {
        return RedirectToAction("/about/candidate")
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