const nodemailer = require("nodemailer")
var nunjucks = require("nunjucks")
nunjucks.configure("Views", { autoescape: true })

class EmailClient {
    constructor(details) {
        this.transporter = nodemailer.createTransport(details)
        this.emailContent;
    }
    createTemplate(template, model) {
        return nunjucks.render(template, model);
    }
    createEmail(emailBodyDetails) {
        this.emailContent = emailBodyDetails;
    }
    async sendEmail() {
        try {
            let mail = await this.transporter.sendMail(this.emailContent);
            return mail;
        } catch (err) {
            return err;
        }
    }
}
module.exports = EmailClient;