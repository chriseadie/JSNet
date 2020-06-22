const { View, Ok, BadRequest, RedirectToAction } = require("../core");

class AboutController {
    index({ id, entityId }) {
        console.log(id, entityId)
        return View("about.html")
    }
    candidate({ id }) {
        let candidateId = { id: id }
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