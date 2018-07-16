module.exports = ( app) => {
    app.get('/darshboard', (req, res) => {
        res.render('darshboard.hbs', {
            pageTitle: "Darshboard page",
            content: "Welcome to darshboad page",
        })
    })
    app.get("/darshboard/contact", (req, res) => {
        res.render("contact.hbs", {
            pageTitle: "Contact page",
        });
    });
    app.get("/darshboard/about", (req, res) => {
        res.render("about.hbs", {
            pageTitle: "About page",
        });
    });
}