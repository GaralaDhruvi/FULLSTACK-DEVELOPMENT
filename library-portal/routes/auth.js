const express = require("express");
const router = express.Router();

// Home page (login form)
router.get("/", (req, res) => {
    res.render("home"); // make sure home.ejs exists
});

// Login route
router.post("/login", (req, res) => {
    const { username } = req.body;

    if (username && username.trim() !== "") {
        // Store session info
        req.session.user = {
            name: username.trim(),
            loginTime: new Date().toLocaleString()
        };
        res.redirect("/profile");
    } else {
        // Render error page with message
        res.render("error", { message: "⚠️ Username is required!" });
    }
});

// Profile route
router.get("/profile", (req, res) => {
    if (req.session.user) {
        res.render("profile", { user: req.session.user });
    } else {
        res.redirect("/");
    }
});

// Logout route
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.render("error", { message: "❌ Error logging out!" });
        }
        res.redirect("/");
    });
});

module.exports = router;
